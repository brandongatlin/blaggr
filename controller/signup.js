const passport = require('passport');
const path = require('path')
const User = require("../models/userModel.js");
const Article = require("../models/articleModel.js");
const Comment = require("../models/commentModel.js");
const Image = require("../models/imageModel.js");

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

var ObjectId = require('mongoose').Types.ObjectId;


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

module.exports = function(app) {

    app.post('/register', function(req, res, next) {
        console.log('registering user');
        console.log(req.body)
        User.register(new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username
        }), req.body.password, function(err) {
            if (err) {
                console.log('error while user register!', err);
                return next(err);
            } else {
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/dashboard');
                })
            }
        })
    });

    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        })
    );

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })

    app.post('/api/profilePic', parser.single("image"), (req, res) => {
        console.log("file", req.file) // to see what is returned to you
        const image = {};
        image.url = req.file.url;
        image.id = req.file.public_id;
        image.userId = req.user._id;

        Image.create(image) // save image information in database
            .then(newImage => console.log(newImage))
            .catch(err => console.log(err));

        User.update({
            _id: req.user._id
        }, {
            $set: {
                profilePic: image.url
            }
        }).then(updatedProfile => {
            res.redirect('/dashboard')
        })
    });

}