import '../../Pages/ChatsPage/index.css'

function Message({ message, user }) {
    const isOwnMessage = message.sender._id === user._id || message.sender === user._id
    const justifyContentStyle = isOwnMessage ? 'flex-end' : 'flex-start';

    return (
      <div className='message-box' style={{ justifyContent: justifyContentStyle }}>
        <div className={`message ${isOwnMessage ? 'sent' : 'received'}`}>
          <div className="message-content">
              <p>{message.content}</p>
          </div>
        </div>
      </div>
  );
}

export default Message