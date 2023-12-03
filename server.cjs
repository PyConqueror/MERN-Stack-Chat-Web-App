const express = require('express');
const path = require('path');
const logger = require('morgan');
const Message = require('./models/message.js');
const Chat = require('./models/chat.js');
const User = require('./models/user.js');
const usersController = require('./controllers/api/users.js');
const communitiesController = require('./controllers/api/communities.js');
const cors = require('cors');

require('dotenv').config();
require('./config/database.cjs');

const app = express();
app.use(cors());
// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(require('./config/checkToken.js'));

app.use('/api/users', require('./routes/api/users.cjs'));
app.use('/api/chats', require('./routes/api/chats.cjs'));
app.use('/api/profiles', require('./routes/api/profiles.cjs'))
app.use('/api/communities', require('./routes/api/communities.cjs'))

app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log('Express running on http://localhost/:' + port);
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: ["https://communitalk-4a7ec5f9373f.herokuapp.com","http://localhost:5173"], 
      methods: ['GET','POST']
    },//https://communitalk-4a7ec5f9373f.herokuapp.com
  }); //"http://localhost:5173"

  io.on('connection', (socket) => {
    console.log('A new client connected');
    
    const generalRoom = 'onlineUsersRoom';

    socket.join(generalRoom);
    socket.to(generalRoom).emit('newUserOnline', { userID: socket.id });

    socket.on('sendFriendRequest', async ({ senderID, friendID }) => {
      usersController.addFriendRequestFromSocket(senderID, friendID)
      const senderData = await User.findById(senderID)
      io.to(generalRoom).emit('friendRequestReceived', {receiverID:friendID, senderData});
    });

    socket.on('acceptFriendRequest', async ({ userID, friendID }) => {
      await usersController.addFriendFromSocket(userID, friendID)
      const senderData = await User.findById(friendID)
      const receiverData = await User.findById(userID)
      io.to(generalRoom).emit('friendRequestAccepted', {receiverID:userID, senderData, secondReceiverID:friendID, receiverData});
    });

    socket.on('rejectFriendRequest', async ({ userID, friendID }) => {
      usersController.rejectFriendRequestFromSocket(userID, friendID)
      io.to(generalRoom).emit('friendRequestRejected', {receiverID:userID});
    });

    socket.on('createGroup', async ({participants}) => {
      io.to(generalRoom).emit('refreshList', {participants})
    })

    socket.on('newPost', async({ newPost }) => {
      const post = await communitiesController.createPostFromSocket(newPost)
      io.to(generalRoom).emit('refreshGroup', {post})
    })

    socket.on('newComment', async ({ newComment}) => {
      let counter = 0
      const comment = await communitiesController.createCommentFromSocket(newComment)
      io.to(generalRoom).emit('refreshComment', {comment})
    })

    socket.on('joinChat', ({ chatID }) => {     // Join a chat room
      socket.join(chatID);
      console.log(`User joined chat: ${chatID}`);
    });
    
    socket.on('sendMessage', async ({ chatID, senderID, content, senderName }) => {  // Handle sending messages
      const newMessage = new Message({ // Save message to database
        chat: chatID,
        sender: senderID,
        content: content,
        senderName: senderName
      });
      await newMessage.save();
      await Chat.findByIdAndUpdate(chatID, {
        $push: { messages: newMessage._id }
      })
      io.to(chatID).emit('newMessage', newMessage);
    });
  
    socket.on('leaveChat', ({ chatID }) => {
      socket.leave(chatID);
      console.log(`User left chat: ${chatID}`);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});