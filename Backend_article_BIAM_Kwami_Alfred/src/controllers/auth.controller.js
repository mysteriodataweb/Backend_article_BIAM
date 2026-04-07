const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const userModel = require("../models/user.model");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Les champs name, email et password sont obligatoires."
      });
    }

    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Un utilisateur avec cet email existe deja."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({ name, email, passwordHash });

    return res.status(201).json({
      success: true,
      message: "Utilisateur cree avec succes.",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Les champs email et password sont obligatoires."
      });
    }

    const user = await userModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Identifiants invalides."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Identifiants invalides."
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name
      },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn }
    );

    return res.status(200).json({
      success: true,
      message: "Connexion reussie.",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};
