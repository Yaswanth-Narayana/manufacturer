import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ManufacturerLoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Perform registration logic for Manufacturer
    // ...
    let validate = false;
    try{
        validate = await axios.post('http://localhost:4000/login/manufacturer',{username : username,password : password});
    } catch(error){
        console.log(error)
    }
    console.log(validate.status);
    if (validate.status === 200 ) navigate('/dashboard/manufacturer');
    else return 'Invalid Crediantials';
  };

  return (
    <div>
      <h2>Manufacturer login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleRegister}>Login</button>
    </div>
  );
}

function TransporterLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    // Perform registration logic for Transporter
    // ...
    let validate = false;
    try{
        validate = await axios.post('http://localhost:4000/login/transporter',{username : username,password : password});
    } catch(error){
        console.log(error)
    }
    console.log(validate);
    if (validate.status === 200 ) navigate('/dashboard/transporter');
    else return 'Invalid Crediantials';
  };

  return (
    <div>
      <h2>Transporter Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleRegister}>Login</button>
    </div>
  );
}

function LoginPage() {
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div>
      <h1>Login Page</h1>
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
      {userType === 'manufacturer' && <ManufacturerLoginForm />}
      {userType === 'transporter' && <TransporterLoginForm />}
    </div>
  );
}

export default LoginPage;
