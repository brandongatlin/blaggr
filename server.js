const express = require("express");
const logger = require("morgan");
const path = require("path");
const session = require('cookie-session');

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    keys: ['hulkamanic']
}));

app.use(express.static(path.join(__dirname, 'public')));
// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

const User = require("./models/userModel.js");
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/blaggrDB", {
    useNewUrlParser: true
});

require("./controller/routes")(app);

const PORT = 3000;

app.use(express.urlencoded({
    extended: true
}));

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;