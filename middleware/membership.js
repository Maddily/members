const pool = require("../db/pool");

async function checkIsNotAMember(req, res, next) {
  const { rows } = await pool.query(
    `SELECT is_member FROM users WHERE id = $1`,
    [req.user.id]
  );

  if (rows[0].is_member === false) {
    return next();
  } else {
    res.redirect("/");
  }
}

module.exports = { checkIsNotAMember };
