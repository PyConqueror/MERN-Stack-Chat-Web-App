import { useState, useEffect } from "react"
import * as friendService from '../../utilities/friends-api';
import * as chatService from '../../utilities/chats-api';
import { useNavigate } from 'react-router-dom';

function GroupChatForm({onClose}) {
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
    navigate('/')
      
}
    return(
        <div className="friends-list">
            <button onClick={onClose}>Close</button>
        <h2>Create Group Chat</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <ul>
          {friends.map(friend => (
            <li key={friend._id}>
              {/* <img src={friend.avatar} alt={friend.name} width="50" height="50" /> */}
              <div className="profile-image" 
                  style={friend.avatar.startsWith('hsl') 
                          ? { backgroundColor: friend.avatar } : { backgroundImage: `url(${friend.avatar})`}}>
                  <p>{ friend.avatar.startsWith('hsl') ? friend.name.charAt(0) : ""}</p>
                </div>
              <span>{friend.name}</span>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFriends.includes(friend._id)}
                  onChange={() => toggleFriendSelection(friend._id)}
                />
                Add
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmit}>Create Group Chat</button>
      </div>
    )
}

export default GroupChatForm