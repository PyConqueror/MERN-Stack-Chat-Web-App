import { useState } from "react";

function FindUser() {
    const [query, setQuery] = useState('')

    async function searchUsers(event, query){
        event.preventDefault();
        const searchedUser = await usersAPI.searchUsers(query)
        console.log("user is: ", searchedUser)
    }
    
    function _handleChange(event){
        setQuery(event.target.value)
    }
    return(
        <form>
        <label>Find users</label>
        <input 
            type="search" 
            placeholder="Search"
            onChange={_handleChange}></input>
        <button onClick={(event) => searchUsers(event, query)}>Search</button>
        </form>
    )
}
export default FindUser


