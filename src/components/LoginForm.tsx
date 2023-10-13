// import { useEffect, useState } from "react";
import  React, {Component, useEffect, useState, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const Login = () => {

  }

  return(
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Login</h2>
        <form onClick={Login}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control"
             id="username" placeholder="Enter your username"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control"
             id="password" placeholder="Enter your password"/>
          </div><br />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default LoginForm;