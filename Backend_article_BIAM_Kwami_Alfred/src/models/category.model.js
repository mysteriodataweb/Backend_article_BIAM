const pool = require("../config/db");

const getAllCategories = async () => {
  const [rows] = await pool.query(
    `SELECT
      id,
      name,
      slug,
      created_at AS createdAt
    FROM categories
    ORDER BY name ASC`
  );

  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      name,
      slug,
      created_at AS createdAt
    FROM categories
    WHERE id = ?
    LIMIT 1`,
    [id]
  );

  return rows[0] || null;
};

const getCategoryBySlug = async (slug) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      name,
      slug,
      created_at AS createdAt
    FROM categories
    WHERE slug = ?
    LIMIT 1`,
    [slug]
  );

  return rows[0] || null;
};

const getCategoryByName = async (name) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      name,
      slug,
      created_at AS createdAt
    FROM categories
    WHERE name = ?
    LIMIT 1`,
    [name]
  );

  return rows[0] || null;
};

const createCategory = async ({ name, slug }) => {
  const [result] = await pool.query(
    "INSERT INTO categories (name, slug) VALUES (?, ?)",
    [name, slug]
  );

  return getCategoryById(result.insertId);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  getCategoryByName,
  createCategory
};
