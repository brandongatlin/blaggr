var express = require("express");
var logger = require("morgan");
const path = require("path");
const session = require('cookie-session');

const bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(session({
    keys: ['secretkey1', 'secretkey2', '...']
}));

app.use(express.static(path.join(__dirname, 'public')));
// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

var User = require("./models/userModel.js");
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/blaggrDB", {
    useNewUrlParser: true
});

require("./controller/routes")(app);

var PORT = 3000;


// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;