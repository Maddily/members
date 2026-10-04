const { body } = require("express-validator");

const validateMessage = [
  body("title").trim().notEmpty().withMessage("Title is required."),
  body("text").trim().notEmpty().withMessage("Message is required."),
];

module.exports = validateMessage;
