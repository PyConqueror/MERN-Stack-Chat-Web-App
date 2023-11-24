const Chat = require('../../models/chat')

module.exports = {
    getChat,
    getMessages,
    sendMessages,
    createGroup
  };

async function getChat(req, res) {
    const partnerId = req.params.id;
    const userId = req.user._id;
    let chat = await Chat.findOne({ //let variable bcause the value can be changed if chat not found 
        participants: { $all: [partnerId, userId] } //$all is a mongoose property to find property include both of the user id
      }).populate('messages').populate('participants', 'username profilePicture') //carry messages and users username and profilepic

      if (!chat) { //if chat not found create a new one between theses 2 users
        const chat = new Chat({
          participants: [partnerId, userId],
          messages: [] // Starting with an empty messages array
        })
      }
      res.json({
        _id: chat._id, //send the chat.id with populated messages and user details
        participants: chat.participants
      });
    }
