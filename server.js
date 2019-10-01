const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const games = require("./routes/api/games");
const character = require("./routes/api/character");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();

require("dotenv").config();

//database config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/games", games);
app.use("/api/character", character);
//server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server has started on port ${port}`));
