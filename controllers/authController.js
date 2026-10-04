const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const { matchedData, validationResult } = require("express-validator");

function signUpGet(req, res) {
  res.render("sign-up", { title: "Sign up", messages: req.flash("messages") });
}

async function signUpPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMap = {};
      for (const error of errors.array()) {
        errorMap[error.path] = error.msg;
      }
      req.flash("messages", errorMap);
      return req.session.save(() => res.redirect("/sign-up"));
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

function loginGet(req, res) {
  res.render("login", { title: "Login", messages: req.flash("messages") });
}

function loginPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMap = {};
      for (const error of errors.array()) {
        errorMap[error.path] = error.msg;
      }
      req.flash("messages", errorMap);
      return req.session.save(() => res.redirect("/login"));
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

function logoutPost(req, res, next) {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
}

module.exports = { signUpGet, signUpPost, loginGet, loginPost, logoutPost };
