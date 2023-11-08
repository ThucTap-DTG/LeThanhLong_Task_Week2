import React, {useEffect} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/student/LoginForm';
import Student from './components/student/Student';
import { BrowserRouter as Router, Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import Create from './components/student/Create';
import Update from './components/student/Update';
import EditAccount from './components/student/edit-user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPenSquare, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import Logout from './components/student/Logout';
import { useNavigate  } from 'react-router-dom'; 
import ChangePassWord from './components/student/ChangePassWord';
import {publicRoutes} from './routes/index';
import DefaultLayout from './layout/DefaultLayout';
import { Fragment } from 'react';



const App = () => {
  return (
    <Router>
      <div className='App'>
         <Routes>
            {publicRoutes.map((route, index) =>{
              const Layout = route.layout === null ? Fragment :DefaultLayout
              const Page = route.component;
              return <Route key={index} path = {route.path} 
              element = {<Layout><Page/></Layout>} />
            })};
         </Routes>
      </div>
    </Router>
  );
}


export default App;