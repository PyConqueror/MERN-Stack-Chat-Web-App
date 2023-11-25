import { useState, useEffect } from 'react';
import * as friendService from '../../utilities/friends-api';

function ChatList() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
      async function fetchChats() {
        const data = await friendService.getChats(); 
        setChats(data);
        console.log(chats)
      }
  
    fetchChats();
    }, []);
    return (
      <div className="chat-list-container">
        <h2>Chats</h2>
        <ul className="chat-list">
          {chats.map(chat => {
            const chatId = chat?._id;
            const chatAvatar = chat.avatar
            const chatName = chat.name
            return (
              <li key={chatId} className="chat-item">
                <img src={chatAvatar}className="chat-avatar" />
                <div className="chat-details">
                  <p className="chat-name">{chatName}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
}

export default ChatList