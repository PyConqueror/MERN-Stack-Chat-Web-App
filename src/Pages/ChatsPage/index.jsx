import { useState } from 'react'
import ChatBox from '../../components/Chats/ChatBox';
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
        <div className='row'>
            <div className='column'>
                <ChatList setSelectedChatID={setSelectedChatID} setChatName={setChatName} setChatAvatar={setChatAvatar} setChatParticipants={setChatParticipants}/>
            </div>
            <div className='column'>
                <ChatBox selectedChatID={selectedChatID} user={user} chatName={chatName} chatAvatar={chatAvatar} chatParticipants={chatParticipants}/>
            </div>
        </div>

    </div>
    )
}

export default ChatPage

