const Router = require("express");
const { signUpPost, signUpGet } = require("../controllers/authController");
const { validateSignUp } = require("../middleware/validators/userValidators");

const authRouter = Router();

authRouter.get("/sign-up", signUpGet);
authRouter.post("/sign-up", validateSignUp, signUpPost);

module.exports = authRouter;
