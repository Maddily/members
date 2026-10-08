const { validationResult, matchedData } = require("express-validator");
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
    stylesheet: "home",
    isMemberOrAdmin,
    messages: rows,
    noMessages: rowCount === 0,
  });
}

async function userMessageListGet(req, res) {
  const { rows, rowCount } = await pool.query(
    `
      SELECT messages.id AS id, title, text, created_at, user_id, users.username AS username
      FROM messages
      JOIN users ON users.id = messages.user_id
      WHERE users.id = $1
    `,
    [req.user.id]
  );

  return res.render("my-messages", {
    title: "My messages",
    stylesheet: "home",
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

    return res.redirect(req.get("Referer"));
  } catch (error) {
    console.error(error);
    next(error);
  }
}

function newMessageGet(req, res) {
  res.render("new-message", {
    title: "New message",
    messages: req.flash("messages"),
  });
}

async function newMessagePost(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMap = {};
      for (const error of errors.array()) {
        errorMap[error.path] = error.msg;
      }

      req.flash("messages", errorMap);
      return req.session.save(() => res.redirect("/new-message"));
    }

    const { title, text } = matchedData(req);

    await pool.query(
      `
      INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)
      `,
      [title, text, req.user.id]
    );
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  messageListGet,
  userMessageListGet,
  deletePost,
  newMessageGet,
  newMessagePost,
};
