const { body } = require("express-validator");
require("dotenv").config();

const validateJoin = [
  body("passcode")
    .notEmpty()
    .withMessage("passcode is required.")
    .custom((value) => value === process.env.PASSCODE)
    .withMessage("incorrect passcode."),
];

module.exports = validateJoin;
