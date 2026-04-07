const app = require("./app");
const env = require("./config/env");
const pool = require("./config/db");
const initializeDatabase = require("./config/initDb");

const startServer = async () => {
  try {
    await initializeDatabase();
    const connection = await pool.getConnection();
    connection.release();

    app.listen(env.port, () => {
      console.log(`Serveur lance sur le port ${env.port}`);
    });
  } catch (error) {
    console.error("Impossible de demarrer le serveur :", error.message);
    process.exit(1);
  }
};

startServer();
