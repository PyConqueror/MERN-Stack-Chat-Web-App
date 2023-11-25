import { useState, useEffect } from "react"
import * as friendService from '../../utilities/friends-api';

function FriendsList() {
    const [friends, setFriends] = useState([]);
    async function fetchFriends() {
        const data = await friendService.getFriends();
        setFriends(data)
    }
    useEffect(() => {
        fetchFriends();
      }, []);    
      return (
        <div className="friends-list">
            <h2>My Friends</h2>
            {friends.length === 0 ? (
                <p>No friends yet.</p>
            ) : (
                <ul>
                    {friends.map(friend => (
                        <li key={friend._id}>
                            <img src={friend.avatar} width="50" height="50" />
                            <p>{friend.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FriendsList