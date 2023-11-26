import React, { useState, useEffect } from 'react';
// import ScrollableFeed from 'react-scrollable-feed';
import * as chatService from '../../utilities/chats-api'

function ChatBox({ selectedChatID }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    useEffect(() => {
        const fetchMessages = async () => {
          const fetchedMessages = await chatService.getMessages(selectedChatID);
          setMessages(fetchedMessages);
        };
    
        if (selectedChatID) {
          fetchMessages();
        }
      }, [selectedChatID]);

    const handleSendMessage = async () => {
    if (newMessage.trim()) {
        await chatService.sendMessage(selectedChatID, newMessage);
    }
    };

    return (
    <div className="chatbox">
      <ul className="message-list">
        {/* {messages.map((msg) => (
          <Message key={msg._id} message={msg} />
        ))} */}
      </ul>
      <div className="message-input">
        <input
          type="content"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};


export default ChatBox