// import { useEffect, useState } from "react";
import  React, {Component, useEffect, useState, FormEvent, createContext, Children, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useNavigate  } from 'react-router-dom'; 
import EditAccount from './edit-user';
import {AccountContext, AccountProvider, useAcc} from '../context/UserContext';
import { User } from '../type/User';

export function LoginForm() {
  const navigate = useNavigate ();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const account = useContext(AccountContext);
  //const [acc, setAcc] = useState('');
  const {acc, setAcc} = useAcc();


  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const status = await localStorage.getItem("MatKhau");
      if (status) {
        navigate('/student');
      }
    } catch (error) {
      console.error("Lỗi: ", error);
    }
  };
  
//   const Account = {
//     username: 'admin',
//     password: '123',
//     address: 'Cà Mau',
//     phone: '0312546984',
//     email: 'admin@gmail.com',
// };
const account: User = {
  username: 'admin',
  password: '123',
  address: 'Cà Mau',
  phone: '0312546984',
  email: 'admin@gmail.com',
};
  const Login = (e: React.FormEvent<HTMLFormElement>) => {
    
    if (username === account.username && password === account.password) {
      // Save loaccountgin status to local storage
      localStorage.setItem('TenDangNhap', username);
      localStorage.setItem('MatKhau', password);
      // Redirect to the home page

      setAcc(account);
      
      navigate('/student');
    } else {
      setError('Invalid username or password');
    }
  };

  return(
    <div className='container'> 
    <br />
    <div className="login-form">
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
          <button type="submit" className="btn btn-primary btn-login">Login</button>
        </form>
  </div>
  </div>
  );
}

export default LoginForm;