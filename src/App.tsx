import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import Student from './components/Student';
import { BrowserRouter as Router, Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import Create from './components/Create';
import Update from './components/Update';
import EditAccount from './components/edit-user';

function App() {
  return (
    <Router>
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li>
                    {/* <a className="nav-link active" aria-current="page" href="/">Login</a>   */}
                    <Link to="/" className="nav-link active" aria-current="page">Login</Link>
                  </li>
                  <li>
                    {/* <a className="nav-link active" aria-current="page" href="/student">Student</a>   */}
                    <Link to="/student" className="nav-link active" aria-current="page">Student</Link>
                  </li>   
                  <li>
                    {/* <a className="nav-link active" aria-current="page" href="/edit-user">edit-user</a>   */}
                    <Link to="/edit-user" className="nav-link active" aria-current="page">edit-user</Link>
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
          <Route path="/edit-user" element={<EditAccount/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;