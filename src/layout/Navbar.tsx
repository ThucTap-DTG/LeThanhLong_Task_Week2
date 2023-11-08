import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPenSquare, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate  } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "gray", borderRadius: 5 }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <Link
                  to="/student"
                  className="nav-link active"
                  aria-current="page"
                >
                  Student
                </Link>
              </li>
              <li>
                <Link
                  to="/edit-user"
                  className="nav-link active"
                  aria-current="page"
                >
                  Edit User
                </Link>
              </li>
              <li></li>
            </ul>
            <Dropdown>
                  <Dropdown.Toggle variant="seconnary" id="dropdown-basic">
                  <FontAwesomeIcon icon={faUser} /> 
                  </Dropdown.Toggle>
                  <Dropdown.Menu>     
                    <Dropdown.Item>
                    <Link to="/logout" style={{textDecoration: 'none', color: 'black'}}>
                        Đăng xuất
                    </Link>   
                                
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/changepassword" style={{textDecoration: 'none', color: 'black'}}>
                        Đổi mật khẩu
                        </Link>
                    </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
