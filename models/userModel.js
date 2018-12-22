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

    // You can read more about RegEx Patterns here https://www.regexbuddy.com/regex.html
    username: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    // posts: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Article",
    // },

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