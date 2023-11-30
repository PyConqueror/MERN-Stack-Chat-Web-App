function Message({ message, user }) {
    const isOwnMessage = message.sender._id === user._id || message.sender === user._id

    return (
      <div className={`message ${isOwnMessage ? 'sent' : 'received'}`}>
        <div className="message-content">
          <p>{message.content}</p>
        </div>
      </div>
  );
}

export default Message