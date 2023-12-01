import { useState, useEffect } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import * as chatService from '../../utilities/chats-api'
import Message from './Message';
import GroupMessage from './GroupMessage';
import io from 'socket.io-client';
import '../../Pages/ChatsPage/index.css'

const socket = io()

function ChatBox({ selectedChatID, user, chatName, chatAvatar, chatParticipants }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const fetchMessages = async () => {
    const fetchedMessages = await chatService.getMessages(selectedChatID)
    setMessages(fetchedMessages);
  };
  const isGroupChat = chatParticipants && chatParticipants.length > 1;

  useEffect(() => {
    if (selectedChatID) {
      fetchMessages();

      socket.emit('joinChat', { chatID: selectedChatID });

      socket.on('newMessage', (newMessage) => {
        setMessages((messages) => [...messages, newMessage]);
      });
    }

    return () => {
      socket.emit('leaveChat', { chatId: selectedChatID });
      socket.off('newMessage');
    };
  }, [selectedChatID]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('sendMessage', { // Send message to the server
        content: newMessage,
        chatID: selectedChatID,
        senderID: user._id,
        senderName: user.name
      });
      setNewMessage('');
    }
  };
  return (
    <div className="chatbox">
      <div className='current-chat'>
        <div className="profile-image" 
        style={chatAvatar.startsWith('hsl') 
        ? { backgroundColor: chatAvatar } : { backgroundImage: `url(${chatAvatar})`}}>
        <p>{ chatAvatar.startsWith('hsl') ? chatAvatar.charAt(0) : ""}</p>
        </div>
        <h3>{chatName}</h3>
      </div>
      {chatParticipants && chatParticipants.length > 0 && (
      <div className='current-chat'>
        {chatParticipants.map((person, index) => (
          <h3 key={index}>{person.name}</h3>
        ))}
      </div>
      )}

<ScrollableFeed>
  {selectedChatID ? (
    messages.length > 0 ? (
      <ul className="message-list">
        {messages.map((message) => (
          isGroupChat ? 
          <GroupMessage key={message._id} message={message} user={user} /> :
          <Message key={message._id} message={message} user={user} />
        ))}
      </ul>
    ) : (
      <p>No messages in this conversation yet.</p>
    )
  ) : (
    <p>Select a conversation to send a message</p>
  )}
</ScrollableFeed>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          disabled={!selectedChatID}
        />
        <button onClick={handleSendMessage} disabled={!selectedChatID}>
          Send
        </button>
      </div>
    </div>
  );
}
export default ChatBox;
