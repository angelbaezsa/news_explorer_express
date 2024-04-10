const Article = require("../models/article");
const NotFoundError = require("../errorConstructors/NotFoundError");
const ForbiddenError = require("../errorConstructors/ForbiddenError");
const BadRequestError = require("../errorConstructors/BadRequestError");

const getArticles = (req, res, next) => {
  Article.find({ owner: req?.user?._id })
    .then((response) => res.send(response))
    .catch((err) => {
      next(err);
    });
};

const saveArticle = (req, res, next) => {
  const { keyword, text, title, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req?.user?._id,
  })
    .then((response) => res.send(response))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid request"));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .orFail(() => {
      throw new NotFoundError("ID not found");
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError("You are not authorized");
      }

      return item.deleteOne().then(() => {
        res.send({ message: "Deleted!" });
      });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = { getArticles, saveArticle, deleteArticle };
