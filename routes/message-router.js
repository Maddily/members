const Router = require("express");
const {
  messageListGet,
  deletePost,
  newMessageGet,
  newMessagePost,
  userMessageListGet,
} = require("../controllers/messageController");
const { checkAuthenticated } = require("../middleware/auth");
const validateMessage = require("../middleware/validators/messageValidators");

const messageRouter = Router();

messageRouter.get("/", checkAuthenticated, messageListGet);
messageRouter.get("/my-messages", checkAuthenticated, userMessageListGet);
messageRouter.post("/delete/:id", deletePost);
messageRouter.get("/new-message", checkAuthenticated, newMessageGet);
messageRouter.post(
  "/new-message",
  checkAuthenticated,
  validateMessage,
  newMessagePost
);

module.exports = messageRouter;
