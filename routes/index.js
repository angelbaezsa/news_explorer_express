const router = require("express").Router();
const articles = require("./articles");
const user = require("./users");
const NotFoundError = require("../errorConstructors/NotFoundError");
const { signup, signin } = require("../controllers/users");
const {
  validateUserCreation,
  validateAuth,
} = require("../middlewares/validation");

router.use("/articles", articles);
router.use("/users", user);

router.post("/signin", validateAuth, signin);
router.post("/signup", validateUserCreation, signup);

router.use((req, res, next) => {
  // res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
  next(new NotFoundError("Cannot find page requested"));
});

module.exports = router;
