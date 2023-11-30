import { useState, useEffect } from "react"
import * as friendService from '../../utilities/friends-api';
import * as chatService from '../../utilities/chats-api';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../Pages/FriendsPage/index.css'

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
      <div className="friends-container">
        <h3>My Friends</h3>
        <ul>
          {friends.map(friend => (
            <li key={friend._id} className="friendlist-item">
              <div className="profile-image" 
                style={friend.avatar.startsWith('hsl') 
                ? { backgroundColor: friend.avatar } : { backgroundImage: `url(${friend.avatar})`}}>
                    <p>{ friend.avatar.startsWith('hsl') ? friend.name.charAt(0) : ""}</p>
              </div>
              <div className="friend-item">
                <span>{friend.name}</span>
                <div>
                  <button onClick={() => viewFriendsProfile(friend._id)}>View profile</button>
                  <button onClick={() => startConversation(friend._id)}>Start Conversation</button>
                </div>
              </div>
              
            </li>
          ))}
        </ul>
      </div>
    );
}

export default FriendsList