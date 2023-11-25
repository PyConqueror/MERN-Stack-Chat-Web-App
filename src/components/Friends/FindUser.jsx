import { useState } from "react";
import * as usersAPI from "../../utilities/users-api"
function FindUser() {
    const [query, setQuery] = useState('')
    const [foundUser, setFoundUser] = useState([])

    async function searchUsers(event, query){

    }
    
    async function _handleChange(event){
        setQuery(event.target.value)
        event.preventDefault();
        const searchedUser = await usersAPI.searchUsers(query)
        setFoundUser(searchedUser)
    }

    async function addFriend(event) {
        const addFriend = await usersAPI.addFriend(event.target.value)
        console.log(event.target.value)
    }
    return(
        <>
        <form>
        <label>Find users</label>
        <input 
            type="search" 
            placeholder="Search"
            onChange={_handleChange}></input>
        <button onClick={(event) => searchUsers(event, query)}>Search</button>
        </form>
        {foundUser.map((user, index) => 
        <>
        <p key={index}>{user.name}</p>
        <button on onClick={addFriend} value={user._id}>Add User</button>
        </>
        )}
        </>
    )
}
export default FindUser


