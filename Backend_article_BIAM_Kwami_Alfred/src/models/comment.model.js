const pool = require("../config/db");

const getCommentsByArticleId = async (articleId) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      article_id AS articleId,
      author,
      content,
      created_at AS createdAt
    FROM comments
    WHERE article_id = ?
    ORDER BY created_at ASC`,
    [articleId]
  );

  return rows;
};

const getCommentById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      article_id AS articleId,
      author,
      content,
      created_at AS createdAt
    FROM comments
    WHERE id = ?
    LIMIT 1`,
    [id]
  );

  return rows[0] || null;
};

const createComment = async ({ articleId, author, content }) => {
  const [result] = await pool.query(
    "INSERT INTO comments (article_id, author, content) VALUES (?, ?, ?)",
    [articleId, author, content]
  );

  return getCommentById(result.insertId);
};

module.exports = {
  getCommentsByArticleId,
  createComment
};
