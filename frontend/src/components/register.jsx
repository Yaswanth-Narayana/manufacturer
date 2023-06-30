import React, { useState } from 'react';
import axios from 'axios';

function ManufacturerRegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try{
        await axios.post('http://localhost:4000/reg/manu',{username : username,password : password})
    } catch (error) {
        console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Manufacturer Registration</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

function TransporterRegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try{
        await axios.post('http://localhost:4000/reg/trans',{username : username,password : password})
    } catch (error) {
        console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Transporter Registration</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

function RegistrationPage() {
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <div>
        <label>
          <input
            type="radio"
            name="userType"
            value="manufacturer"
            checked={userType === 'manufacturer'}
            onChange={handleUserTypeChange}
          />
          Manufacturer
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="transporter"
            checked={userType === 'transporter'}
            onChange={handleUserTypeChange}
          />
          Transporter
        </label>
      </div>
      {userType === 'manufacturer' && <ManufacturerRegistrationForm />}
      {userType === 'transporter' && <TransporterRegistrationForm />}
    </div>
  );
}

export default RegistrationPage;
