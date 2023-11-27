const Chat = require('../../models/chat')
const Message = require('../../models/message');
const User = require("../../models/user");


module.exports = {
    getChat,
    getMessages,
    sendMessage,
    createGroup,
  };

async function getChat(req, res) {
    const chatID = req.params.id //group chat has an id of the chat id, individial chat has an id of a chat partner
    const chat = await Chat.findById(chatID).populate('participants', 'name avatar');
    if (chat) { //check if chat available
        res.json(chat); //if yes returned with chat 
    } else { //if no find the chat based on the participants (one to one conversation)
    const partnerId = req.params.id;
    const userId = req.user._id;
    let chat = await Chat.findOne({ //let variable bcause the value can be changed if individual chat not found 
        participants: { $all: [partnerId, userId] || [userId ,partnerId]} //$all is a mongoose property to find property include both of the user id
      }).populate('participants', 'name avatar') //carry messages and users username and profilepic
    if (chat) { 
        res.json(chat)
    }else {
    chat = new Chat({ 
        participants: [partnerId, userId],
        messages: [] // Starting with an empty messages array
    })
    await chat.save();
    chat = await Chat.findById(chat._id).populate('participants', 'name avatar');
    await User.findByIdAndUpdate(userId, { $push: { chats: chat._id } });
    await User.findByIdAndUpdate(partnerId, { $push: { chats: chat._id } })
    res.json(chat);
}
}} 

async function getMessages(req, res) {
    const chatID = req.params.id;
    const messages = await Message.find({ chat: chatID })
    .sort({ date: +1 }) //sort by date, newest first
    .populate('sender', 'name avatar') // Populate sender details
    res.json(messages)
}   

async function sendMessage(req, res) {
    const newMessage = await Message.create({
        sender: req.user._id,
        content: req.body.content,
        chat: req.params.id
    });
    await newMessage.save();
    await Chat.findByIdAndUpdate(req.params.id, {
        $push: { messages: newMessage._id } //push the message in messages array in chat schema
    })
    // await getMessages(req, res); // call the getMessages function to send updated messages list
}

async function createGroup(req, res) {
    const {groupName, participants} = req.body //participants should be an array of user id sent from frontend (selected from friend list)
    const allParticipants = [...participants, req.user._id];
    const groupChat = new Chat({
        participants: allParticipants,
        isGroup: true,
        GroupName: groupName,
        messages: [] //starting with empty array as usual when starting a new chat
    })
    await groupChat.save();
    await User.updateMany(
        { _id: { $in: allParticipants } },
        { $push: { chats: groupChat._id } }
      );
      return res.status(200)
}

