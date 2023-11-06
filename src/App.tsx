import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import Student from "./components/Student";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
  Link,
} from "react-router-dom";
import Create from "./components/Create";
import Update from "./components/Update";
import EditAccount from './components/edit-user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowLeft, faArrowLeftLong, faArrowRotateLeft, faCoffee, faFloppyDisk, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';  

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary" style={{borderRadius: 5}}>
          <div className="container-fluid">           
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to="/student"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Student
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/edit-user"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Edit-user
                  </Link>
                </li>
                <li className="nav-item" style={{marginLeft: 900}}>
                  <Link
                    to="/"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
              </ul>           
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/student" element={<Student />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="/edit-user" element={<EditAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
