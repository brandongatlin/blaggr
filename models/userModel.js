const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

// Using the Schema constructor, create a new UserSchema object
const UserSchema = new Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'What\'s your first name?']
    },

    lastName: {
        type: String,
        trim: true,
        required: [true, 'What\'s your last name?']
    },

    // You can read more about RegEx Patterns here https://www.regexbuddy.com/regex.html
    username: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    tags: {
        type: String,
        minlength: 3
    },

    following: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },

    written: {
        type: [Schema.Types.ObjectId],
        ref: "Article"
    },

    userCreated: {
        type: Date,
        default: Date.now
    },

    profilePic: {
        type: "String",
        ref: "Image",
        default: "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/4a/4a3515fc3b35e84999865a8015e5480e1b864cfa_full.jpg"
    }

}, {
    multi: true
});

UserSchema.plugin(passportLocalMongoose);


// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = mongoose.model('User', UserSchema);