const router = require("express").Router();

const { validateArticle, validateId } = require("../middlewares/validation");
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");

const { auth } = require("../middlewares/auth");

router.get("/", auth, getArticles);
router.post("/", auth, validateArticle, saveArticle);
router.delete("/:articleId", auth, validateId, deleteArticle);
module.exports = router;
