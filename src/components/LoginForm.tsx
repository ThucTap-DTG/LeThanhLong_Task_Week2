import { useEffect, useState } from "react";
import  React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import '../App.css';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Xử lý logic đăng nhập
//     console.log('Username:', username);
//     console.log('Password:', password);
//     // Reset form sau khi xử lý
//     setUsername('');
//     setPassword('');
//   };

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;