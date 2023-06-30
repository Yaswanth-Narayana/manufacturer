import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Manufacturer Page
const ManufacturerPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    to: '',
    from: '',
    quantity: '',
    transporter: '',
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newMessage)
    try {
      await axios.post('http://localhost:4000/api/messages', newMessage);
      setNewMessage({
        to: '',
        from: '',
        quantity: '',
        transporter: '',
      });
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Manufacturer Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          To:
          <input type="text" value={newMessage.to} onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })} />
        </label>
        <label>
          From:
          <input type="text" value={newMessage.from} onChange={(e) => setNewMessage({ ...newMessage, from: e.target.value })} />
        </label>
        <label>
          Quantity:
          <select value={newMessage.quantity} onChange={(e) => setNewMessage({ ...newMessage, quantity: e.target.value })}>
            <option value="">Select quantity</option>
            <option value="1">1 ton</option>
            <option value="2">2 tons</option>
            <option value="3">3 tons</option>
          </select>
        </label>
        <label>
          Transporter:
          <select value={newMessage.transporter} onChange={(e) => setNewMessage({ ...newMessage, transporter: e.target.value })}>
            <option value="">Select transporter</option>
            <option value="Transporter 1">Transporter 1</option>
            <option value="Transporter 2">Transporter 2</option>
            <option value="Transporter 3">Transporter 3</option>
          </select>
        </label>
        <button type="submit">Send Message</button>
      </form>
      <h2>Received Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <div>Order ID: {message.orderID}</div>
            <div>To: {message.to}</div>
            <div>From: {message.from}</div>
            <div>Quantity: {message.quantity}</div>
            <div>Address: {message.address}</div>
            <div>Transporter: {message.transporter}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Transporter Page
const TransporterPage = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState({
    orderId: '',
    price: '',
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  };

  const handleReply = async (messageId) => {
    try {
      await axios.post(`http://localhost:4000/api/messages/${messageId}/reply`, reply);
      fetchMessages();
    } catch (error) {
      console.error('Error replying to message:', error);
    }
  };

  return (
    <div>
      <h1>Transporter Dashboard</h1>
      <h2>Received Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <div>Order ID: {message.orderID}</div>
            <div>To: {message.to}</div>
            <div>From: {message.from}</div>
            <div>Quantity: {message.quantity}</div>
            <div>Address: {message.address}</div>
            <div>Transporter: {message.transporter}</div>
            <label>
              Price:
              <input type="text" value={reply.price} onChange={(e) => setReply({ ...reply, price: e.target.value })} />
            </label>
            <button onClick={() => handleReply(message._id)}>Reply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Home(props) {
  // Render ManufacturerPage or TransporterPage based on user selection during registration
  const userType = props.type; // Replace with actual user type obtained from registration

  return (
    <div>
      {userType === 'Manufacturer' ? <ManufacturerPage /> : <TransporterPage />}
    </div>
  );
}
