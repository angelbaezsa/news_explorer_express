const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const NotFoundError = require("../errorConstructors/NotFoundError");
const UnauthorizedError = require("../errorConstructors/UnauthorizedError");
const ConflictError = require("../errorConstructors/ConflictError");
const BadRequestError = require("../errorConstructors/BadRequestError");

const { JWT_SECRET } = process.env;

const getCurrentUser = (req, res, next) => {
  // console.log(req.user);
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) =>
      res.send({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      })
    )
    .catch((err) => {
      next(err);
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) =>
      res.send({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      })
    )
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

const signup = (req, res, next) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) throw new ConflictError("Email already exists");
      return bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .then((item) => {
          res.send({
            data: {
              _id: item._id,
              name: item.name,
              email: item.email,
            },
            token: jwt.sign({ _id: item._id }, JWT_SECRET, { expiresIn: "7d" }),
          });
        })
        .catch((e) => {
          if (e.name === "ValidationError")
            next(new BadRequestError("Invalid data"));
          next(e);
        });
    })
    .catch((err) => next(err));
};

module.exports = {
  getCurrentUser,
  signup,
  signin,
};
