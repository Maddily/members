const Router = require("express");
const {
  signUpPost,
  signUpGet,
  loginGet,
  loginPost,
} = require("../controllers/authController");
const {
  validateSignUp,
  validateLogin,
} = require("../middleware/validators/userValidators");
const passport = require("passport");

const authRouter = Router();

authRouter.get("/sign-up", signUpGet);
authRouter.post("/sign-up", validateSignUp, signUpPost);
authRouter.get("/login", loginGet);
authRouter.post("/login", validateLogin, loginPost, (req, res, next) => {
  /**
   * Pass a callback function instead of the options object
   * to have control over redirection.
   * `req.session.save(callback)` guarantees the session, including
   * the flashed messages from the verify function, is fully written
   * to the sessions table before `res.redirect` fires,
   * fixing the race condition.
   */
  passport.authenticate("local", (error, user, info) => {
    if (error) return next(error);

    if (!user) return req.session.save(() => res.redirect("/login"));

    req.logIn(user, (error) => {
      if (error) return next(error);

      req.session.save(() => res.redirect("/"));
    });
  })(req, res, next);
});

module.exports = authRouter;
