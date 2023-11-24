const Chat = require('../../models/chat')
const Message = require('../../models/message')

module.exports = {
    getChat,
    getMessages,
    sendMessage,
    createGroup
  };

async function getChat(req, res) {
    const chatID = req.params.id //group chat has an id of the chat id, individial chat has an id of a chat partner
    const chat = await Chat.findById(chatID).populate('participants', 'name avatar');
    if (chat && chat.isGroup) { //check if chat available and a group chat
        res.json(chat); //if yes returned with chat 
    } else { //if no find the chat based on the participants (one to one conversation)
    const partnerId = req.params.id;
    const userId = req.user._id;
    let chat = await Chat.findOne({ //let variable bcause the value can be changed if individual chat not found 
        participants: { $all: [partnerId, userId] } //$all is a mongoose property to find property include both of the user id
      }).populate('participants', 'name avatar') //carry messages and users username and profilepic
    if (!chat) { //if chat not found create a new one between theses 2 users
    chat = new Chat({
        participants: [partnerId, userId],
        messages: [] // Starting with an empty messages array
    })
    await chat.save();
    chat = await Chat.findById(chat._id).populate('participants', 'name avatar');
    }
    res.json(chat);
}} 

async function getMessages(req, res) {
    const chatID = req.params.id;
    const messages = await Message.find({ chat: chatID })
    .sort({ date: -1 }) //sort by date, newest first
    .populate('sender', 'username avatar') // Populate sender details
    .populate('receiver', 'username avatar') // Populate receiver details
    res.json(messages)
}   

async function sendMessage(req, res) {
    const chatID = req.params.id
    const senderID = req.user._id
    const content = req.body.content //extract message from body
    const newMessage = new Message({ //create new message
        chat: chatID,
        sender: senderID,
        content: content
    })
    await newMessage.save();
    await Chat.findByIdAndUpdate(chatID, {
        $push: { messages: newMessage._id } //push the message in messages array in chat schema
    })
    await getMessages(req, res); // call the getMessages function to send updated messages list
}

async function createGroup(req, res) {
    const {groupName, participants} = req.body //participants should be an array of user id sent from frontend (selected from friend list)
    const groupChat = new Chat({
        participants: participants,
        isGroup: true,
        groupName: groupName,
        messages: [] //starting with empty array as usual when starting a new chat
    })
    await groupChat.save();
    await groupChat.populate('partipants' ,'username avatar')
    res.json(groupChat)
}
