import { useState, useEffect } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import * as chatService from '../../utilities/chats-api'
import Message from './Message'

function ChatBox({ selectedChatID, user }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
    useEffect(() => {
        async function fetchMessages() {
          const fetchedMessages = await chatService.getMessages(selectedChatID);
          setMessages(fetchedMessages)
          console.log(fetchedMessages)
        };
        if (selectedChatID) {
          console.log(selectedChatID)
          fetchMessages();
        }
      }, [selectedChatID, setMessages]);

    const handleSendMessage = async () => {
        await chatService.sendMessage(selectedChatID, newMessage);
        console.log(selectedChatID)
    };

    return (
      <div className="chatbox">
        <ScrollableFeed>
          {messages === null ? (
            <ul className="message-list">
              {messages.map((message) => (
                <Message key={message._id} message={message} user={user} />
              ))}
            </ul>
          ) : (
            <p className="no-conversation">No conversation yet</p>
          )}
        </ScrollableFeed>
        <div className="message-input">
          <p>CURRENT CONVERSATION ID : {selectedChatID}</p>
          <input
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
}

export default ChatBox