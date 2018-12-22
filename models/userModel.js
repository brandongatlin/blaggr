var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

// Using the Schema constructor, create a new UserSchema object
var UserSchema = new Schema({

    firstName: {
        type: String,
        trim: true,
        required: "Username is Required"
    },

    lastName: {
        type: String,
        trim: true,
        required: "Username is Required"
    },

    // password: {
    //     type: String,
    //     trim: true,
    //     required: "Password is Required",
    //     validate: [
    //         function(input) {
    //             return input.length >= 6;
    //         },
    //         "Password should be longer."
    //     ]
    // },
    // You can read more about RegEx Patterns here https://www.regexbuddy.com/regex.html
    username: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    userCreated: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(passportLocalMongoose);


// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = mongoose.model('User', UserSchema);