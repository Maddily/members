const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const authRouter = require("./routes/auth-router");
const passport = require("passport");
const pool = require("./db/pool");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require the entire Passport config module so app.js knows about it
require("./config/passport");

// -------------- SESSION SETUP ----------------
const sessionStore = new pgSession({
  pool,
  createTableIfMissing: true,
  tableName: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
    },
  })
);

// -------------- PASSPORT AUTHENTICATION ----------------
app.use(passport.session());

// Make user data available to all views
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(express.static(path.join(__dirname, "public/images")));
app.use("/", authRouter);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log("App is running...");
});
