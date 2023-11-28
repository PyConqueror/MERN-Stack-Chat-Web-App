import { useState } from "react"
import * as usersAPI from '../../utilities/users-api'


function PendingRequest({ pendingFriends, fetchFriends }){

async function acceptRequest(friendID) {
    await usersAPI.addFriend(friendID)
    fetchFriends()
}
async function denyFriendRequest(friendID) {
  await usersAPI.denyRequest(friendID)
}
return (
  <div className="pendingrequest">
    <h3>PENDING FRIEND REQUESTS</h3>
    {pendingFriends.length > 0 ? (
      pendingFriends.map((friend, index) => (
        <li key={index}>
          <div className="profile-image"
            style={friend.avatar.startsWith('hsl')
              ? { backgroundColor: friend.avatar } : { backgroundImage: `url(${friend.avatar})` }}>
            <p>{friend.avatar.startsWith('hsl') ? friend.name.charAt(0) : ""}</p>
          </div>
          <span>{friend.name}</span>
          <button onClick={acceptRequest(friend._id)}>Accept</button>
          {/* <button onClick={denyFriendRequest(friend._id)}>Deny</button> */}

        </li>
      ))
    ) : (
      <p>No friend requests.</p>
    )}
  </div>
);
}

export default PendingRequest