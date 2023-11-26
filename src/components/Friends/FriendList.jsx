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
 

    return (
      <div className="friends-list">
        <h2>My Friends</h2>
        <ul>
          {friends.map(friend => (
            <li key={friend._id}>
              <img src={friend.avatar} alt={friend.name} width="50" height="50" />
              <span>{friend.name}</span>
              <button onClick={() => startConversation(friend._id)}>
                Start Conversation
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default FriendsList