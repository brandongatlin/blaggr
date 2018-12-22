const passport = require('passport');
const path = require('path')
var User = require("../models/userModel.js");
var Article = require("../models/articleModel.js");


module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendFile('/index.html', {
            root: 'views'
        });
    })

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
            }

            console.log('user registered!');

            res.redirect('/dashboard');
        });
    });

    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        })
    );

    app.get('/dashboard', function(req, res) {
        console.log('auth ', req.isAuthenticated())
        console.log('user ', req.user)

        if (req.isAuthenticated()) {
            console.log(__dirname)
            res.sendFile('/blog.html', {
                root: 'views'
            });
        } else {
            res.send("nononononon not logge din")
        }

    });

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