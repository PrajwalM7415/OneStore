import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ isAdmin }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setSocket(newSocket);

      if (isAdmin) {
        newSocket.emit('joinAdminRoom');
      } else {
        newSocket.emit('joinCustomerRoom');
      }
    });

    newSocket.on('newMessage', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      newSocket.emit('dis');

      newSocket.off();
    };
  }, []);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', message);

      setMessage('');
    }
  };

  return (
    <div>
      <h2>{isAdmin ? 'Admin Chat Room' : 'Customer Chat Room'}</h2>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.sender}: {message.text}
          </li>
        ))}
      </ul>

      <div>
        <input type="text" value={message} onChange={handleInputChange} />

        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
