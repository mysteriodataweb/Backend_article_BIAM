const commentModel = require("../models/comment.model");
const articleModel = require("../models/article.model");

const isPositiveInteger = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

const getCommentsByArticle = async (req, res, next) => {
  try {
    const articleId = Number(req.params.articleId);

    if (!isPositiveInteger(articleId)) {
      return res.status(400).json({
        success: false,
        message: "Identifiant d'article invalide."
      });
    }

    const comments = await commentModel.getCommentsByArticleId(articleId);

    res.status(200).json({
      success: true,
      message: "Commentaires recuperes.",
      data: comments
    });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { articleId, author, content } = req.body;

    if (!articleId || !author || !content) {
      return res.status(400).json({
        success: false,
        message: "Les champs articleId, author et content sont obligatoires."
      });
    }

    const normalizedAuthor = String(author).trim();
    const normalizedContent = String(content).trim();

    if (!normalizedAuthor || !normalizedContent) {
      return res.status(400).json({
        success: false,
        message: "L'auteur et le contenu du commentaire ne peuvent pas etre vides."
      });
    }

    if (!isPositiveInteger(articleId)) {
      return res.status(400).json({
        success: false,
        message: "Identifiant d'article invalide."
      });
    }

    const article = await articleModel.getArticleById(Number(articleId));

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article introuvable."
      });
    }

    const comment = await commentModel.createComment({
      articleId: Number(articleId),
      author: normalizedAuthor,
      content: normalizedContent
    });

    return res.status(201).json({
      success: true,
      message: "Commentaire ajoute avec succes.",
      data: comment
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommentsByArticle,
  createComment
};
