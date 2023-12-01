import { useState, useEffect } from "react"
import * as friendService from '../../utilities/friends-api';
import * as chatService from '../../utilities/chats-api';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../../Pages/ChatsPage/index.css'

const socket = io()

function GroupChatForm({onClose, fetchChats}) {
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    async function fetchFriends() {
        const data = await friendService.getFriends();
        setFriends(data)
    }
    useEffect(() => {
        fetchFriends();
      }, []);

    const toggleFriendSelection = (friendId) => {
    setSelectedFriends(
        selectedFriends.includes(friendId)
        ? selectedFriends.filter(id => id !== friendId)
        : [...selectedFriends, friendId]
    );
    };
      
    async function handleSubmit(){
    if (groupName.trim() === '' || selectedFriends.length === 0) {
        alert('Please enter a group name and select friends to select.');
    }
    const groupChat = {
        groupName,
        participants: selectedFriends
      };
    await chatService.createGroup(groupChat)
    socket.emit('createGroup', {
      participants: selectedFriends
    });
    onClose()
    setTimeout(() => {
      fetchChats();
  }, 1000); // 1 seconds to save data to database before rerender
}
    return(
        <div className="friends-list">
          <div className="create-groupchat-header">
            <h2>Create Group Chat</h2>
            <button onClick={onClose} className="close-button">&times;</button>
          </div>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <ul>
          {friends.map(friend => (
            <li key={friend._id} className="chat-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedFriends.includes(friend._id)}
                  onChange={() => toggleFriendSelection(friend._id)}
                />
                Add
              </label>
              <div className="profile-image" 
                  style={friend.avatar.startsWith('hsl') 
                          ? { backgroundColor: friend.avatar } : { backgroundImage: `url(${friend.avatar})`}}>
                  <p>{ friend.avatar.startsWith('hsl') ? friend.name.charAt(0) : ""}</p>
                </div>
              <span>{friend.name}</span>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmit}>Create Group Chat</button>
      </div>
    )
}

export default GroupChatForm