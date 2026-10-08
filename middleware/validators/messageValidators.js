const { body } = require("express-validator");

const validateMessage = [
  body("title").trim().notEmpty().withMessage("title is required."),
  body("text").trim().notEmpty().withMessage("message is required."),
];

module.exports = validateMessage;
