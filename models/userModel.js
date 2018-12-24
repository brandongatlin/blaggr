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

    following: {
        type: [Schema.Types.ObjectId]
    },

    userCreated: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(passportLocalMongoose);


// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = mongoose.model('User', UserSchema);