const { validationResult } = require("express-validator");
const pool = require("../db/pool");

function joinGet(req, res) {
  res.render("join", {
    title: "join",
    stylesheet: "join",
    messages: req.flash("messages"),
  });
}

async function joinPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("messages", errors.errors[0].msg);
      return req.session.save(() => res.redirect("/join"));
    }

    await pool.query(`UPDATE users SET is_member = TRUE WHERE id = $1`, [
      req.user.id,
    ]);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { joinGet, joinPost };
