const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route introuvable."
  });
};

module.exports = notFoundHandler;
