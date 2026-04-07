const articleModel = require("../models/article.model");
const categoryModel = require("../models/category.model");

const isPositiveInteger = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await articleModel.getAllArticles();

    res.status(200).json({
      success: true,
      message: "Liste des articles recuperee.",
      data: articles
    });
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const articleId = Number(req.params.id);

    if (!isPositiveInteger(articleId)) {
      return res.status(400).json({
        success: false,
        message: "Identifiant d'article invalide."
      });
    }

    const article = await articleModel.getArticleById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article introuvable."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article recupere.",
      data: article
    });
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const { title, content, categoryId } = req.body;

    if (!title || !content || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Les champs title, content et categoryId sont obligatoires."
      });
    }

    const normalizedTitle = String(title).trim();
    const normalizedContent = String(content).trim();

    if (!normalizedTitle || !normalizedContent) {
      return res.status(400).json({
        success: false,
        message: "Le titre et le contenu ne peuvent pas etre vides."
      });
    }

    if (!isPositiveInteger(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Identifiant de categorie invalide."
      });
    }

    const category = await categoryModel.getCategoryById(Number(categoryId));

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Categorie introuvable."
      });
    }

    const article = await articleModel.createArticle({
      title: normalizedTitle,
      content: normalizedContent,
      authorId: req.user.userId,
      categoryId: Number(categoryId)
    });

    return res.status(201).json({
      success: true,
      message: "Article cree avec succes.",
      data: article
    });
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const articleId = Number(req.params.id);

    if (!isPositiveInteger(articleId)) {
      return res.status(400).json({
        success: false,
        message: "Identifiant d'article invalide."
      });
    }

    const existingArticle = await articleModel.getArticleById(articleId);

    if (!existingArticle) {
      return res.status(404).json({
        success: false,
        message: "Article introuvable."
      });
    }

    if (existingArticle.authorId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Vous ne pouvez modifier que vos propres articles."
      });
    }

    const nextTitle =
      req.body.title !== undefined ? String(req.body.title).trim() : existingArticle.title;
    const nextContent =
      req.body.content !== undefined
        ? String(req.body.content).trim()
        : existingArticle.content;
    const nextCategoryId =
      req.body.categoryId !== undefined
        ? Number(req.body.categoryId)
        : existingArticle.categoryId;

    if (!nextTitle || !nextContent || !isPositiveInteger(nextCategoryId)) {
      return res.status(400).json({
        success: false,
        message: "Les donnees de mise a jour sont invalides."
      });
    }

    const category = await categoryModel.getCategoryById(nextCategoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Categorie introuvable."
      });
    }

    const article = await articleModel.updateArticle(articleId, {
      title: nextTitle,
      content: nextContent,
      categoryId: nextCategoryId
    });

    return res.status(200).json({
      success: true,
      message: "Article modifie avec succes.",
      data: article
    });
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const articleId = Number(req.params.id);

    if (!isPositiveInteger(articleId)) {
      return res.status(400).json({
        success: false,
        message: "Identifiant d'article invalide."
      });
    }

    const existingArticle = await articleModel.getArticleById(articleId);

    if (!existingArticle) {
      return res.status(404).json({
        success: false,
        message: "Article introuvable."
      });
    }

    if (existingArticle.authorId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Vous ne pouvez supprimer que vos propres articles."
      });
    }

    await articleModel.deleteArticle(articleId);

    return res.status(200).json({
      success: true,
      message: "Article supprime avec succes."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
