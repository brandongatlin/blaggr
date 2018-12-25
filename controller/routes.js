const passport = require('passport');
const path = require('path')
const User = require("../models/userModel.js");
const Article = require("../models/articleModel.js");
const Comment = require("../models/commentModel.js");
const Image = require("../models/imageModel.js");

var ObjectId = require('mongoose').Types.ObjectId;


module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('home');
    })

    app.get('/dashboard', function(req, res) {

        console.log('auth ', req.isAuthenticated())
        console.log('user ', req.user)

        User.findOne({
            _id: new ObjectId(req.user._id)
        }, function(err, profile) {
            console.log("profile is ", profile)

            let hbsObj = {
                profile: profile
            }

            if (req.isAuthenticated()) {
                res.render('dashboard', hbsObj)
            } else {
                res.redirect('/')
            }
        })
    })

    app.post('/post', function(req, res) {
        console.log('post', req.body);

        Article.create({
            title: req.body.title,
            subTitle: req.body.subheading,
            body: req.body.text,
            author: req.user._id
        }).then(function(newPost) {
            console.log(newPost);

            res.redirect('/dashboard')
        })

    })

}