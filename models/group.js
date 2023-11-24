const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    category: String,
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

module.exports = mongoose.model('Group', groupSchema);