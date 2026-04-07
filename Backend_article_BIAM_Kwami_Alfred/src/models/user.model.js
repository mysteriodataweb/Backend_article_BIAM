const pool = require("../config/db");

const findByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT id, name, email, password_hash, created_at FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows[0] || null;
};

const createUser = async ({ name, email, passwordHash }) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );

  return {
    id: result.insertId,
    name,
    email
  };
};

module.exports = {
  findByEmail,
  createUser
};
