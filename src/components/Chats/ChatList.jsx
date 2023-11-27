import { useState, useEffect } from 'react';
import * as friendService from '../../utilities/friends-api';
import GroupChatForm from './GroupChatForm';

function ChatList({ setSelectedChatID, setChatName, setChatAvatar }) {
    const [chats, setChats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    console.log(chats)

    useEffect(() => {
      async function fetchChats() {
        const data = await friendService.getChats(); 
        setChats(data);
        console.log(chats)
      }
  
    fetchChats();
    }, []);
    
    function handleChatClick(chatID, chatName, chatAvatar) {
      setSelectedChatID(chatID)
      setChatName(chatName)
      setChatAvatar(chatAvatar)
    }
    
    return (
      <div className="chat-list-container">
        <h2>Chat List</h2>
        <button onClick={openModal}>Create Group Chat</button>

        {chats && chats.length > 0 ? (
          <ul className="chat-list">
            {chats.map(chat => (
              <li key={chat._id} className="chat-item" onClick={() => handleChatClick(chat._id, chat.name, chat.avatar)}>
                {/* <img src={chat.avatar || 'default-avatar.png'} className="chat-avatar" alt="Chat Avatar" /> */}
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