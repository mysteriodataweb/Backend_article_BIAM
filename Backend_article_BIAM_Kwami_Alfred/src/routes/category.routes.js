const express = require("express");
const categoryController = require("../controllers/category.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.post("/", authenticateToken, categoryController.createCategory);

module.exports = router;
