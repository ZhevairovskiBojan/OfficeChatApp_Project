const mongoose = require ("mongoose");

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    text: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Post", PostSchema);

