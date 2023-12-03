import { useState } from 'react'
import ChatBox from '../../components/Chats/ChatBox Websocket';
import ChatList from '../../components/Chats/ChatList';
import './index.css'

function ChatPage({ user }){
    const [selectedChatID, setSelectedChatID] = useState('')
    const [chatName, setChatName] = useState('')
    const [chatAvatar, setChatAvatar] = useState('')
    const [chatParticipants, setChatParticipants] = useState('')

    return(
    <div className='chats-container'>
        <div className='row'>
            <div className='column'>
                <ChatList 
                setSelectedChatID={setSelectedChatID} 
                setChatName={setChatName} 
                setChatAvatar={setChatAvatar} 
                setChatParticipants={setChatParticipants}
                user={user}
                />
            </div>
            <div className='column'>
                <ChatBox selectedChatID={selectedChatID} user={user} chatName={chatName} chatAvatar={chatAvatar} chatParticipants={chatParticipants}/>
            </div>
        </div>

    </div>
    )
}

export default ChatPage

