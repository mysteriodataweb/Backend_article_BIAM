const categoryModel = require("../models/category.model");

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.getAllCategories();

    res.status(200).json({
      success: true,
      message: "Liste des categories recuperee.",
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Le champ name est obligatoire."
      });
    }

    const normalizedName = String(name).trim();
    const slug = slugify(normalizedName);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Nom de categorie invalide."
      });
    }

    const existingByName = await categoryModel.getCategoryByName(normalizedName);
    const existingBySlug = await categoryModel.getCategoryBySlug(slug);

    if (existingByName || existingBySlug) {
      return res.status(409).json({
        success: false,
        message: "Cette categorie existe deja."
      });
    }

    const category = await categoryModel.createCategory({
      name: normalizedName,
      slug
    });

    return res.status(201).json({
      success: true,
      message: "Categorie creee avec succes.",
      data: category
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory
};
