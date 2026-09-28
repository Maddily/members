const Router = require("express");
const {
  messageListGet,
  deletePost,
} = require("../controllers/messageController");
const { checkAuthenticated } = require("../middleware/auth");

const messageRouter = Router();

messageRouter.get("/", checkAuthenticated, messageListGet);
messageRouter.post("/delete/:id", deletePost);

module.exports = messageRouter;
