import { useState, useEffect } from "react";
import * as usersAPI from '../../utilities/users-api'

function FindUser() {
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
        const addFriend = await usersAPI.addFriend(foundUsersId)
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
            <p key={index}>{user.name}</p>
            <button 
                key={user._id}
                onClick={(event) => addFriendToUser(event)} 
                value={user._id}>Add User</button>
        </>
        )}
        </>
    )
}

export default FindUser


