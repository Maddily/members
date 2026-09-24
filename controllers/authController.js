const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const { matchedData, validationResult } = require("express-validator");

function signUpGet(req, res) {
  res.render("sign-up", { title: "Sign up" });
}

async function signUpPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      "first-name": firstName,
      "last-name": lastName,
      username,
      password,
    } = matchedData(req);

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, username, hashedPassword]
    );
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { signUpGet, signUpPost };
