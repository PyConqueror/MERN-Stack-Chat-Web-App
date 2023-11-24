const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    isGroup: false,
    GroupName: String,
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

module.exports = mongoose.model('Chat', chatSchema);