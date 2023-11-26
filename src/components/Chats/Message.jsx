function Message({ message, user }) {
    const isOwnMessage = message.sender._id === currentUser._id;

    return (
        <div className={`message ${isOwnMessage ? 'sent' : 'received'}`}>//if own message label the message div as sent
          <div className="message-content">
            <p>{message.content}</p>
          </div>
          <div className="message-meta">
            <span>{formatDate(message.date)}</span> // havent confirmed because no data to work with
          </div>
        </div>
      );
}

export default Message