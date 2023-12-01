import { useState, useEffect } from 'react';
import * as friendService from '../../utilities/friends-api';
import GroupChatForm from './GroupChatForm';
import io from 'socket.io-client';
import '../../Pages/ChatsPage/index.css'

const socket = io()

function ChatList({ setSelectedChatID, setChatName, setChatAvatar, setChatParticipants, user }) {
    const [chats, setChats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    async function fetchChats() {
      const data = await friendService.getChats(); 
      setChats(data);
  };

  useEffect(() => {
      fetchChats();
      socket.on('refreshList', ({participants}) => {
        if (participants.includes(user._id)) {
          fetchChats();
        }
      });  
  }, []);
    
    function handleChatClick(chatID, chatName, chatAvatar, chatParticipants) {
      setSelectedChatID(chatID)
      setChatName(chatName)
      setChatAvatar(chatAvatar)
      setChatParticipants(chatParticipants)
    }
    
    return (
      <>
        <h2>Chat List</h2>
        <button onClick={openModal}>Create Group Chat</button>
        <div className="chat-list-container">

          {chats && chats.length > 0 ? (
            <ul className="chat-list">
              {chats.map(chat => (
                <li key={chat._id} className="chat-item" onClick={() => handleChatClick(chat._id, chat.name, chat.avatar, chat.participants)}>
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
        {isModalOpen && <GroupChatForm onClose={closeModal} fetchChats={fetchChats} />}
        </div>
      </>
    );
}

export default ChatList