const express = require("express");
require("dotenv").config();
const path = require("path");
const authRouter = require("./routes/auth-router");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/images")));

app.use("/", authRouter);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log("App is running...");
});
