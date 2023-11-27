import { useState, useEffect } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import * as chatService from '../../utilities/chats-api'
import Message from './Message';
import io from 'socket.io-client';

const socket = io('http://localhost:3001')

function ChatBox({ selectedChatID, user, chatName, chatAvatar }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    const fetchedMessages = await chatService.getMessages(selectedChatID)
    setMessages(fetchedMessages);
  };

  useEffect(() => {
    if (selectedChatID) {
      fetchMessages();

      socket.emit('joinChat', { chatID: selectedChatID });

      socket.on('newMessage', (newMessage) => {
        setMessages((messages) => [...messages, newMessage]);
        console.log(newMessage)
      });
    }

    return () => {
      socket.emit('leaveChat', { chatId: selectedChatID });
      socket.off('messageReceived');
    };
  }, [selectedChatID]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', { // Send message to the server
        content: newMessage,
        chatID: selectedChatID,
        senderID: user._id,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chatbox">
      <h3>{chatName}</h3>
      <ScrollableFeed>
        {messages.length > 0 ? (
          <ul className="message-list">
            {messages.map((message) => (
              <Message key={message._id} message={message} user={user} />
            ))}
          </ul>
        ) : (
          <p>No conversation yet</p>
        )}
      </ScrollableFeed>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
export default ChatBox;
