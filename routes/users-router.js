const Router = require("express");
const { checkAuthenticated } = require("../middleware/auth");
const validateJoin = require("../middleware/validators/membershipValidators");
const { checkIsNotAMember } = require("../middleware/membership");
const { joinGet, joinPost } = require("../controllers/usersController");

const usersRouter = Router();

usersRouter.get("/join", checkAuthenticated, checkIsNotAMember, joinGet);
usersRouter.post(
  "/join",
  checkAuthenticated,
  checkIsNotAMember,
  validateJoin,
  joinPost
);

module.exports = usersRouter;
