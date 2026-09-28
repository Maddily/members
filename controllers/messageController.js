const pool = require("../db/pool");

async function messageListGet(req, res) {
  const { rows, rowCount } = await pool.query(
    `
      SELECT messages.id AS id, title, text, created_at, user_id, users.username AS username, (user_id = $1) AS is_author
      FROM messages 
      JOIN users ON users.id = messages.user_id
    `,
    [req.user.id]
  );

  const isMemberOrAdmin = req.user.is_member || req.user.is_admin;

  return res.render("home", {
    title: "Home",
    isMemberOrAdmin,
    messages: rows,
    noMessages: rowCount === 0,
  });
}

async function deletePost(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query(
      `
      DELETE FROM messages
      WHERE id = $1 RETURNING *
    `,
      [id]
    );

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { messageListGet, deletePost };
