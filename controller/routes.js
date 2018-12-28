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

        let hbsObj = {
            // profile: profile,
            // blogs: blogs
        }

        User.findOne({
            _id: new ObjectId(req.user._id)
        }, function(err, profile) {
            // console.log("profile is ", profile)
            hbsObj.profile = profile;

            if (profile.following) {
                console.log(profile.following);
                profile.following.forEach(function(blogger) {
                    console.log("blogger: " + blogger);
                    Article.find({
                        author: new ObjectId(blogger)
                    }, function(err, blogs) {
                        console.log("blogs in callback ", blogs)
                        hbsObj.blogs = blogs;

                        if (req.isAuthenticated()) {
                            console.log("hbs object is: ", hbsObj)

                            res.render('dashboard', hbsObj)
                        } else {
                            res.redirect('/')
                        }
                    })
                })
            }



        })
    })

    app.post('/post', function(req, res) {

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