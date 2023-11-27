import { useState } from 'react'
import ChatBox from '../../components/Chats/ChatBox';
import ChatList from '../../components/Chats/ChatList';
import './index.css'

function ChatPage({ user }){
    const [selectedChatID, setSelectedChatID] = useState('')
    return(
    <>
        <h1>CHATS PAGE</h1>
        <ChatList setSelectedChatID={setSelectedChatID}/>
        <ChatBox selectedChatID={selectedChatID} user={user}/>
    </>
    )
}

export default ChatPage

