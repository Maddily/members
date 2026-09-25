const { body } = require("express-validator");
const pool = require("../../db/pool");

const validateSignUp = [
  body("first-name").trim().notEmpty().withMessage("First name is required."),
  body("last-name").trim().notEmpty().withMessage("Last name is required."),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .custom(async (value) => {
      const { rowCount } = await pool.query(
        `SELECT * from users WHERE username = LOWER($1)`,
        [value]
      );
      if (rowCount) throw new Error("Username already in use");
    }),
  body("password").notEmpty().withMessage("Password is required."),
  body("confirm-password")
    .notEmpty()
    .withMessage("Confirm password is required.")
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
];

const validateLogin = [
  body("username").notEmpty().withMessage("Username is required."),
  body("password").notEmpty().withMessage("Password is required."),
];

module.exports = { validateSignUp, validateLogin };
