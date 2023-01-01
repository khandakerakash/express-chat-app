// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal imports
const {
  notFoundHandler,
  defaultErrorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// database connection
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.set(express.static(path.join(__dirname, "/public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup

// 404 not found handler
app.use(notFoundHandler);

// error handling
app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, () => {
  console.log(`app listening to post ${process.env.APP_PORT}`);
});
