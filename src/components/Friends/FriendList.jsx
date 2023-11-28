import { useState, useEffect } from "react"
import * as friendService from '../../utilities/friends-api';
import * as chatService from '../../utilities/chats-api';
import { Navigate, useNavigate } from 'react-router-dom';

function FriendsList({friends, setFriends, fetchFriends }) {
    const navigate = useNavigate()

    async function startConversation(ID) {
       await chatService.createConversation(ID)
       navigate('/')
    }

    function viewFriendsProfile(friendId){
      navigate(`/profile/${encodeURIComponent(friendId)}`, {state: { friendId }})
    }

    return (
      <div className="friends-list">
        <h2>My Friends</h2>
        <ul>
          {friends.map(friend => (
            <li key={friend._id}>
              <div className="profile-image" 
                style={friend.avatar.startsWith('hsl') 
                ? { backgroundColor: friend.avatar } : { backgroundImage: `url(${friend.avatar})`}}>
                    <p>{ friend.avatar.startsWith('hsl') ? friend.name.charAt(0) : ""}</p>
              </div>
              <span>{friend.name}</span>
              <button onClick={() => startConversation(friend._id)}>
                Start Conversation
              </button>
              <button onClick={() => viewFriendsProfile(friend._id)}>View profile</button>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default FriendsList