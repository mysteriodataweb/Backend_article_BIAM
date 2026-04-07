const express = require("express");
const articleController = require("../controllers/article.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);
router.post("/", authenticateToken, articleController.createArticle);
router.put("/:id", authenticateToken, articleController.updateArticle);
router.delete("/:id", authenticateToken, articleController.deleteArticle);

module.exports = router;
