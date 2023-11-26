import { useState, useEffect } from 'react';
import * as friendService from '../../utilities/friends-api';

function ChatList({ setSelectedChatID }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
      async function fetchChats() {
        const data = await friendService.getChats(); 
        setChats(data);
        console.log(chats)
      }
  
    fetchChats();
    }, []);
    
    function handleChatClick(chatID) {
      setSelectedChatID(chatID)
    }
    
    return (
      <div className="chat-list-container">
        <h2>Chats</h2>
        <ul className="chat-list">
          {chats.map(chat => (
            <li key={chat._id} className="chat-item" onClick={() => handleChatClick(chat._id)}>
              <img src={chat.avatar || 'default-avatar.png'} className="chat-avatar" alt="Chat Avatar" />
              <div className="chat-details">
                <p className="chat-name">{chat.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default ChatList