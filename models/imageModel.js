const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

// Using the Schema constructor, create a new UserSchema object
const ImageSchema = new Schema({

    url: {
        type: String,
        trim: true,
        required: [true, 'Error loading URL to cloudify']
    },

    id: {
        type: String,
        required: [true, 'Error loading image id to cloudify']
    },

    userId: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },

    imageCreated: {
        type: Date,
        default: Date.now
    }

});

ImageSchema.plugin(passportLocalMongoose);


// This creates our model from the above schema, using mongoose's model method
const Image = mongoose.model("Image", ImageSchema);

// Export the User model
module.exports = mongoose.model('Image', ImageSchema);