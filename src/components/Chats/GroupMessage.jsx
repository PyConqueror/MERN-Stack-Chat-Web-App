function GroupMessage({ message, user }) {
  const isOwnMessage = message.sender._id === user._id || message.sender === user._id;
  const senderName = message.sender.name || message.senderName;

  return (
    <div className={`message ${isOwnMessage ? 'sent' : 'received'}`}>
      <div className="message-content">
        {isOwnMessage ? (
          <p>{message.content}</p>
        ) : (
          <p><strong>{senderName}:</strong> {message.content}</p>
        )}
      </div>
    </div>
  );
}

export default GroupMessage;