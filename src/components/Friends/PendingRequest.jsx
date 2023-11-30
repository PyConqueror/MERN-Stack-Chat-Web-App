import { useState, useEffect } from "react"
import * as usersAPI from '../../utilities/users-api'
import '../../Pages/FriendsPage/index.css'

function PendingRequest({ pendingFriends, acceptFriendRequest, rejectFriendRequest }){

async function acceptRequest(friendID) {
  acceptFriendRequest(friendID)
}

async function denyFriendRequest(friendID) {
  rejectFriendRequest(friendID)
}

return (
  <div className="friends-container">
    <h3>Friend Requests</h3>
    <ul>
    {pendingFriends.length > 0 ? (
      pendingFriends.map((friend, index) => (
        <li key={index} style={{ listStyleType: "none"}} className="friendlist-item">
          <div className="profile-image"
            style={friend.avatar.startsWith('hsl')
              ? { backgroundColor: friend.avatar } : { backgroundImage: `url(${friend.avatar})` }}>
            <p>{friend.avatar.startsWith('hsl') ? friend.name.charAt(0) : ""}</p>
          </div>
          <div className="friend-item">
          <span>{friend.name}</span>
            <div>
              <button onClick={() => acceptRequest(friend._id)}>Accept</button>
              <button onClick={() => denyFriendRequest(friend._id)}>Deny</button>
            </div>
          </div>
        </li>
      ))
    ) : (
      <p>No pending friend requests.</p>
    )}
    </ul>
  </div>
);
}

export default PendingRequest