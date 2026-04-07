const pool = require("../config/db");

const articleSelect = `
  SELECT
    a.id,
    a.title,
    a.content,
    a.author_id AS authorId,
    u.name AS author,
    u.email AS authorEmail,
    a.category_id AS categoryId,
    c.name AS category,
    c.slug AS categorySlug,
    a.created_at AS createdAt,
    a.updated_at AS updatedAt
  FROM articles a
  INNER JOIN users u ON a.author_id = u.id
  INNER JOIN categories c ON a.category_id = c.id
`;

const getAllArticles = async () => {
  const [rows] = await pool.query(
    `${articleSelect}
    ORDER BY a.created_at DESC`
  );

  return rows;
};

const getArticleById = async (id) => {
  const [rows] = await pool.query(
    `${articleSelect}
    WHERE a.id = ?
    LIMIT 1`,
    [id]
  );

  return rows[0] || null;
};

const createArticle = async ({ title, content, authorId, categoryId }) => {
  const [result] = await pool.query(
    "INSERT INTO articles (title, content, author_id, category_id) VALUES (?, ?, ?, ?)",
    [title, content, authorId, categoryId]
  );

  return getArticleById(result.insertId);
};

const updateArticle = async (id, { title, content, categoryId }) => {
  const [result] = await pool.query(
    `UPDATE articles
    SET title = ?, content = ?, category_id = ?
    WHERE id = ?`,
    [title, content, categoryId, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getArticleById(id);
};

const deleteArticle = async (id) => {
  const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);

  return result.affectedRows > 0;
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
