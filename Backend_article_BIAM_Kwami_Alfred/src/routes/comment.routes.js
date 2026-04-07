const express = require("express");
const commentController = require("../controllers/comment.controller");

const router = express.Router();

router.get("/article/:articleId", commentController.getCommentsByArticle);
router.post("/", commentController.createComment);

module.exports = router;
