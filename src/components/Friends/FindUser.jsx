import { useState, useEffect } from "react";
import * as usersAPI from '../../utilities/users-api'
import '../../Pages/FriendsPage/index.css'

function FindUser({sendFriendRequest}) {
    const [query, setQuery] = useState('')
    const [foundUsers, setFoundUsers] = useState([])
    
    async function _handleChange(event){
        setQuery(event.target.value)
        event.preventDefault();
        const searchedUsers = await usersAPI.searchUsers(query)
        setFoundUsers(searchedUsers)
    }

    async function addFriendRequest(friendID){
        sendFriendRequest(friendID)
        setQuery('');
        setFoundUsers([])
    }

    return(
        <div>
            <form>
                <input 
                    type="search" 
                    placeholder="Search and add other users to chat with them"
                    onChange={_handleChange}></input>
            </form>
            <div className="friends-container">
                <ul>
                {foundUsers.map((user, index) => 
                    <li key = {index} className="friendlist-item">
                        <div className="profile-image"
                                style={user.avatar.startsWith('hsl') 
                                    ? { backgroundColor: user.avatar } : { backgroundImage: `url(${user.avatar})`}}>
                                { user.avatar.startsWith('hsl') ? user.name.charAt(0) : ""}
                        </div>
                        <div className="friend-item">
                        <span>{user.name}</span>
                            <button     
                                key={user._id}
                                onClick={(event) => addFriendRequest(user._id)} 
                                value={user._id}>Send Friend Request</button>
                        </div>
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
}

export default FindUser


