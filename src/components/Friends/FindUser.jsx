import { useState, useEffect } from "react";
import * as usersAPI from '../../utilities/users-api'

function FindUser({fetchFriends, friends, setFriends}) {
    const [query, setQuery] = useState('')
    const [foundUsers, setFoundUsers] = useState([])
    
    async function _handleChange(event){
        setQuery(event.target.value)
        event.preventDefault();
        const searchedUsers = await usersAPI.searchUsers(query)
        setFoundUsers(searchedUsers)
    }

    async function addFriendToUser(event) {
        event.preventDefault();
        const foundUsersId = event.target.value
        await usersAPI.addFriend(foundUsersId)
        fetchFriends()
    }

    async function addFriendRequest(friendID){
        await usersAPI.addFriendRequest(friendID)
    }

    return(
        <>
        <form>
        <label>Find users</label>
        <input 
            type="search" 
            placeholder="Search"
            onChange={_handleChange}></input>
        </form>

        {foundUsers.map((user, index) => 
        <>
            <p key={user.name}>{user.name}</p>
            <button 
                key={user._id}
                onClick={(event) => addFriendRequest(user._id)} 
                value={user._id}>Add Friend Request</button>
        </>
        )}
        </>
    )
}

export default FindUser


