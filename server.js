var express = require("express");
const app = express();
var logger = require("morgan");
var mongoose = require("mongoose");

const session = require('cookie-session');
app.use(session({
    keys: ['secretkey1', 'secretkey2', '...']
}));

var passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

// const fs = require('fs');
// const path = require('path');

var PORT = 3000;

// Requiring the `User` model for accessing the `users` collection
var User = require("./models/userModel.js");
// const modelsPath = path.resolve(__dirname, 'models')
// fs.readdirSync(modelsPath).forEach(file => {
//     require(modelsPath + '/' + file);
// });

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/blaggrDB", {
    useNewUrlParser: true
});

// Routes

// Route to post our form submission to mongoDB via mongoose
// app.post("/submit", function(req, res) {
//     // Create a new user using req.body
//     User.create(req.body)
//         .then(function(dbUser) {
//             // If saved successfully, send the the new User document to the client
//             res.json(dbUser);
//         })
//         .catch(function(err) {
//             // If an error occurs, send the error to the client
//             res.json(err);
//         });
// });

app.post('/register', function(req, res, next) {
    console.log('registering user');
    User.register(new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
    }), req.body.password, function(err) {
        if (err) {
            console.log('error while user register!', err);
            return next(err);
        }

        console.log('user registered!');

        res.redirect('/');
    });
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});