const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "JSON invalide dans le corps de la requete."
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur interne du serveur.";

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
