const express = require("express");
const exphbs = require('express-handlebars');
const logger = require("morgan");
const path = require("path");
const session = require('cookie-session');
require('dotenv').config()

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const app = express();

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const Image = require('./models/imageModel');

app.use(logger("dev"));

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');

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

//img upload section
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "test_pics",
    allowedFormats: ["jpg", "png"],
    transformation: [{
        width: 500,
        height: 500,
        crop: "limit"
    }]
});

const parser = multer({
    storage: storage
});

app.post('/api/images', parser.single("image"), (req, res) => {
    console.log(req.file) // to see what is returned to you
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    image.userId = req.user._id;

    Image.create(image) // save image information in database
        .then(newImage => res.render('dashboard'))
        .catch(err => console.log(err));
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;