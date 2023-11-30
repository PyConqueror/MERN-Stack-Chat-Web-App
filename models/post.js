const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    group: {type: Schema.Types.ObjectId, ref: 'Community'},
    content: String,
    images: [{ type: String }],
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);