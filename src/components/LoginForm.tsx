// import { useEffect, useState } from "react";
import  React, {Component, useEffect, useState, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useNavigate  } from 'react-router-dom';


export function LoginForm() {
  const navigate = useNavigate ();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    
  }, []);

  const Login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username1 = localStorage.getItem('username');
    const password1 = localStorage.getItem('password');
    if(username1 === 'admin' && password1 === 'admin'){
      navigate('/student');
    }
    else if (username === 'admin' && password === 'admin') {
      // Save login status to local storage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      // Redirect to the home page
      navigate('/student');
    } else {
      setError('Invalid username or password');
    }
  };

  return(
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Login</h2>
        <form onClick={Login}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control"
             id="username" placeholder="Enter your username"
             onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control"
             id="password" placeholder="Enter your password"
             onChange={(e) => setPassword(e.target.value)}/>
          </div><br />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default LoginForm;