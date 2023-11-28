import { useState } from 'react'
import ChatBox from '../../components/Chats/ChatBox Websocket';
import ChatList from '../../components/Chats/ChatList';
import './index.css'

function ChatPage({ user }){
    const [selectedChatID, setSelectedChatID] = useState('')
    const [chatName, setChatName] = useState('')
    const [chatAvatar, setChatAvatar] = useState('')
    const [chatParticipants, setChatParticipants] = useState('')
    console.log(chatParticipants)

    return(
    <div className='content-container'>
        <h1>CHATS PAGE</h1>
        <ChatList setSelectedChatID={setSelectedChatID} setChatName={setChatName} setChatAvatar={setChatAvatar} setChatParticipants={setChatParticipants}/>
        <ChatBox selectedChatID={selectedChatID} user={user} chatName={chatName} chatAvatar={chatAvatar} chatParticipants={chatParticipants}/>
    </div>
    )
}

export default ChatPage

