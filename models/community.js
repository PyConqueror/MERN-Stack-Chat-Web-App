const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    coverPhoto: {type: String},
    category: [{
        type: String,
        default: "All"
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]

})

module.exports = mongoose.model('Community', communitySchema);