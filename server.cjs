const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const Message = require('./models/message.js');
const Chat = require('./models/chat.js');


require('dotenv').config();
require('./config/database.cjs');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(require('./config/checkToken.js'));

// create-react-app has a "build" directory
// vite uses the "dist" directory instead
app.use('/api/users', require('./routes/api/users.cjs'));
app.use('/api/chats', require('./routes/api/chats.cjs'));
app.use('/api/profiles', require('./routes/api/profiles.cjs'))
app.use('/api/communities', require('./routes/api/communities.cjs'))

/// app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'dist')));


const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log('Express running on http://localhost/:' + port);
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5173",
      methods: ['GET','POST']
    },
  });

  io.on('connection', (socket) => {
    console.log('A new client connected');
  
    socket.on('joinChat', ({ chatID }) => {     // Join a chat room
      socket.join(chatID);
      console.log(`User joined chat: ${chatID}`);
    });
  
    socket.on('sendMessage', async ({ chatID, senderID, content }) => {  // Handle sending messages

      const newMessage = new Message({ // Save message to database
        chat: chatID,
        sender: senderID,
        content: content,
      });
      await newMessage.save();
      await Chat.findByIdAndUpdate(chatID, {
        $push: { messages: newMessage._id }
      })
      io.to(chatID).emit('newMessage', newMessage);
    });
  
    socket.on('leaveChat', ({ chatId }) => {
      socket.leave(chatId);
      console.log(`User left chat: ${chatId}`);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  

// This needs to be the last route:
// All unrecognised requests get served the home page
// (i.e. the React application):
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});