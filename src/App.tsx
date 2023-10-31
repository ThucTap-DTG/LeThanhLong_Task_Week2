import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import Student from './components/Student';
import { BrowserRouter as Router, Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import Create from './components/Create';
import Update from './components/Update';

function App() {
  return (
    <Router>
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li>
                    <a className="nav-link active" aria-current="page" href="/">Login</a>  
                  </li>
                  <li>
                    <a className="nav-link active" aria-current="page" href="/student">Student</a>  
                  </li>                
                </ul>
              </div>
            </div>
          </nav>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/student" element={<Student/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/update" element={<Update/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;