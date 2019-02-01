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
        User.find({
            _id: new ObjectId(req.user._id)
        }).populate('following').populate('written').exec(function(err, results) {
            console.log(results[0])
            res.render('dashboard', results)
        })

    })

    // app.get('/dashboard', (req, res) => {

    //     Article.find({
    //         author: new ObjectId(req.user._id)
    //     }).populate('author').exec(function(err, results) {
    //         if (err) return err;

    //         console.log(results)

    //         let userData = results[0].author;

    //         let articles = results[0];

    //         let hbsObj = {
    //             user: userData,
    //             articles: articles
    //         }

    //         console.log('hbs' + hbsObj)

    //         res.render('dashboard', hbsObj)
    //     })
    // })

    // app.get('/dashboard', function(req, res) {

    //     let hbsObj = {}

    //     User.findOne({
    //         _id: new ObjectId(req.user._id)
    //     }, function(err, profile) {
    //         hbsObj.profile = profile;
    //         if (profile.following.length > 0) {
    //             profile.following.forEach(function(blogger) {
    //                 Article.find({
    //                     author: new ObjectId(blogger)
    //                 }, function(err, blogs) {
    //                     hbsObj.blogs = blogs;
    //                     if (req.isAuthenticated()) {
    //                         res.render('dashboard', hbsObj)
    //                     } else {
    //                         res.redirect('/')
    //                     }
    //                 })
    //             })
    //         } else {
    //             if (req.isAuthenticated()) {
    //                 res.render('dashboard', hbsObj)
    //             } else {
    //                 res.redirect('/')
    //             }
    //         }
    //     })
    // })

    app.post('/post', function(req, res) {

        let tags = req.body.tags.split(" ");

        Article.create({
            title: req.body.title,
            subTitle: req.body.subheading,
            body: req.body.text,
            tags: tags,
            author: req.user._id
        }).then(function(newPost) {
            console.log(newPost);

            res.redirect('/dashboard')
        })

    })

}