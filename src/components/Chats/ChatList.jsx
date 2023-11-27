import { useState, useEffect } from 'react';
import * as friendService from '../../utilities/friends-api';
import GroupChatForm from './GroupChatForm';

function ChatList({ setSelectedChatID }) {
    const [chats, setChats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        <h2>Chat List</h2>
        <button onClick={openModal}>Create Group Chat</button>

        {chats && chats.length > 0 ? (
          <ul className="chat-list">
            {chats.map(chat => (
              <li key={chat._id} className="chat-item" onClick={() => handleChatClick(chat._id)}>
                <div className="profile-image" 
                  style={chat.avatar.startsWith('hsl') 
                          ? { backgroundColor: chat.avatar } : { backgroundImage: `url(${chat.avatar})`}}>
                  <p>{ chat.avatar.startsWith('hsl') ? chat.name.charAt(0) : ""}</p>
                </div>
                <div className="chat-details">
                  <p className="chat-name">{chat.name}</p>
                </div>
              </li>
            ))}
          </ul>


        ) : (
          <p>No chats yet.</p>
        )}
      {isModalOpen && <GroupChatForm onClose={closeModal} />}
      </div>
    );
}

export default ChatList