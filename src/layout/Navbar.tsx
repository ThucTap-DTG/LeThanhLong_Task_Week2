import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPenSquare, faPlus, faTrash, faUser,
       faGraduationCap, faBook, faBars } from '@fortawesome/free-solid-svg-icons';
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
              <Dropdown>
                  <Dropdown.Toggle variant="seconnary" id="dropdown-basic" style={{color: 'white', fontWeight:'bold'}}>
                  <FontAwesomeIcon icon={faBars} /> Category
                  </Dropdown.Toggle>
                  <Dropdown.Menu>     
                    <Dropdown.Item>
                    <Link to="/student" style={{textDecoration: 'none', color: 'black'}}>
                    <FontAwesomeIcon icon={faGraduationCap} /> Students
                    </Link>                                  
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/getsubject" style={{textDecoration: 'none', color: 'black'}}>
                        <FontAwesomeIcon icon={faBook} /> Subjects
                        </Link>
                    </Dropdown.Item>                  
                    </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
            <Dropdown>
                  <Dropdown.Toggle variant="seconnary" id="dropdown-basic" style={{color: 'white'}}>
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
                    <Dropdown.Item>
                        <Link to="/edit-user" style={{textDecoration: 'none', color: 'black'}}>
                        Edit User
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
