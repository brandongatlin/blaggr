const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

    title: {
        type: String,
        trim: true,
        required: "Title is required",
        maxlength: 100
    },

    subTitle: {
        type: String,
        trim: true,
        required: "Subtitle is required",
        mixlength: 150
    },

    body: {
        type: String,
        trim: true,
        required: "Post text is required",
        minlength: 200
    },

    visible: {
        type: Boolean,
        default: false
    },

    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    articleCreated: {
        type: Date,
        default: Date.now
    },

    articleUpdated: {
        type: Date,
        default: Date.now
    }

})

const Article = mongoose.model("Article", ArticleSchema);

// Export the Note model
module.exports = Article;