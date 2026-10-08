const { body } = require("express-validator");
const pool = require("../../db/pool");

const validateSignUp = [
  body("first-name").trim().notEmpty().withMessage("first name is required."),
  body("last-name").trim().notEmpty().withMessage("last name is required."),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required.")
    .custom(async (value) => {
      const { rowCount } = await pool.query(
        `SELECT * from users WHERE username = LOWER($1)`,
        [value]
      );
      if (rowCount) throw new Error("username already in use");
    }),
  body("password").notEmpty().withMessage("password is required."),
  body("confirm-password")
    .notEmpty()
    .withMessage("confirm password is required.")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("passwords do not match."),
];

const validateLogin = [
  body("username").notEmpty().withMessage("username is required."),
  body("password").notEmpty().withMessage("password is required."),
];

module.exports = { validateSignUp, validateLogin };
