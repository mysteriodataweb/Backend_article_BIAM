const express = require("express");
const authRoutes = require("./auth.routes");
const articleRoutes = require("./article.routes");
const categoryRoutes = require("./category.routes");
const commentRoutes = require("./comment.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API operationnelle."
  });
});

router.use("/auth", authRoutes);
router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
