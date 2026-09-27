const { body } = require("express-validator");
require("dotenv").config();

const validateJoin = [
  body("passcode")
    .notEmpty()
    .withMessage("Passcode is required.")
    .custom((value) => value === process.env.PASSCODE)
    .withMessage("Incorrect passcode."),
];

module.exports = validateJoin;
