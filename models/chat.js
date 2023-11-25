const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    isGroup: {type: Boolean, default: false},
    GroupName: { type: String, default: "" },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

module.exports = mongoose.model('Chat', chatSchema);