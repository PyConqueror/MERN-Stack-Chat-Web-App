import { useState } from 'react'
import ChatBox from '../../components/Chats/ChatBox Websocket';
import ChatList from '../../components/Chats/ChatList';
import './index.css'

function ChatPage({ user }){
    const [selectedChatID, setSelectedChatID] = useState('')
    const [chatName, setChatName] = useState('')
    const [chatAvatar, setChatAvatar] = useState('')

    return(
    <>
        <h1>CHATS PAGE</h1>
        <ChatList setSelectedChatID={setSelectedChatID} setChatName={setChatName} setChatAvatar={setChatAvatar}/>
        <ChatBox selectedChatID={selectedChatID} user={user} chatName={chatName} chatAvatar={chatAvatar}/>
    </>
    )
}

export default ChatPage

