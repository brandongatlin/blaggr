const passport = require('passport');
const path = require('path')
var User = require("../models/userModel.js");

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

    // app.get('/login', function(req, res) {
    //     res.sendFile('dashboard.html', {
    //         user: req.user
    //     });
    // });

    // app.post('/login', passport.authenticate('local'), function(req, res) {
    //     console.log('login req is ')

    //     res.redirect("/dashboard")
    // })

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
            res.sendFile('/dashboard.html', {
                root: 'views'
            });
        } else {
            res.send("nononononon not logge din")
        }

    });

}