const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
const CommentSchema = new Schema({

    text: String,

    critic: {
        type: String,
        default: "Anon"
    },

    approved: {
        type: Boolean,
        default: false
    },

    commentCreated: {
        type: Date,
        default: Date.now
    }

});

// This creates our model from the above schema, using mongoose's model method
const Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;