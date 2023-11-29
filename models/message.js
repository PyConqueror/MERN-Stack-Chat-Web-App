const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    senderName: String,
    date: { type: Date, default: Date.now }
},{
    timestamps: true
}
)

module.exports = mongoose.model('Message', messageSchema);