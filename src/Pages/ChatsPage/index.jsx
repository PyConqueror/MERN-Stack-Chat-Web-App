import { useState } from 'react'
import * as usersAPI from '../../utilities/users-api'
import ChatBox from '../../components/Chats/ChatBox';
import ChatList from '../../components/Chats/ChatList';
import './index.css'

function ChatPage(){
    
    return(
    <>
        <h1>CHATS PAGE</h1>
        <ChatList/>
        <ChatBox/>
    </>
    )
} //Chatbox component
//CHatlist component
//profileview compoment

export default ChatPage

// Define Chats Section component (Personal and Groups)
//   Create state to hold list of chats
//   Define function to fetch chats from backend via api in utilities folder
//   Define function to handle real-time chat updates via websocket(i will do it)
//   Render list of chats
//     For each chat, display last message preview and timestamp

//import css
