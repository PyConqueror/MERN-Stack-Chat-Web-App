// Define Chats Section component (Personal and Groups)
//   Create state to hold list of chats
//   Define function to fetch chats from backend via api in utilities folder
//   Define function to handle real-time chat updates via websocket(i will do it)
//   Render list of chats
//     For each chat, display last message preview and timestamp

//import css

import { useState } from 'react'
import * as usersAPI from '../../utilities/users-api'
import ChatBox from '../../Components/Chats/ChatBox';

function ChatPage(){

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
    <>
        <h1>CHATS PAGE</h1>
        <ChatBox/>
    </>
    )
} //Chatbox component
//CHatlist component
//profileview compoment

export default ChatPage