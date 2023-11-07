import React, {useEffect} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import Student from './components/Student';
import { BrowserRouter as Router, Route, BrowserRouter, Routes, Link } from 'react-router-dom';
import Create from './components/Create';
import Update from './components/Update';
import EditAccount from './components/edit-user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPenSquare, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import Logout from './components/Logout';
import { useNavigate  } from 'react-router-dom'; 
import ChangePassWord from './components/ChangePassWord';



const App = () => {
  const status = localStorage.getItem("MatKhau");
  // useEffect(() => {
  //   checkLogin();
  // }, [status])

  const checkLogin = () =>{
    const status = localStorage.getItem("MatKhau");
    let message;
    if (status !== null) {
      message = 
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
    }
    else if(status === null || status === undefined){
      message = 
      <Dropdown>
          <Dropdown.Toggle variant="seconnary" id="dropdown-basic">
              <FontAwesomeIcon icon={faUser} /> 
          </Dropdown.Toggle>
          <Dropdown.Menu>
      
          <Dropdown.Item>
            <Link to="/logout" style={{textDecoration: 'none', color: 'black'}}>
              Đăng nhập
            </Link>   
                        
            </Dropdown.Item>
            </Dropdown.Menu>
      </Dropdown>
    }
    return message;
  };
  const temp = checkLogin();
  return (
    <Router>
      <div>
          <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: 'gray', borderRadius: 5}}>
            <div className="container-fluid">              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li>
                    {/* <a className="nav-link active" aria-current="page" href="/student">Student</a>   */}
                    <Link to="/student" className="nav-link active" aria-current="page">Student</Link>
                  </li>   
                  <li>
                    {/* <a className="nav-link active" aria-current="page" href="/edit-user">edit-user</a>   */}
                    <Link to="/edit-user" className="nav-link active" aria-current="page">Edit User</Link>
                  </li>  
                  <li>
                    {/* <a className="nav-link active" aria-current="page" href="/">Login</a>   */}
                    {/* <Link to="/" className="nav-link active" aria-current="page" style={{marginLeft: 1100}}>
                      <FontAwesomeIcon icon={faUser} /> 
                    </Link> */}                             
                  </li>            
                </ul>
                {/* <Dropdown>
                  <Dropdown.Toggle variant="seconnary" id="dropdown-basic">
                  <FontAwesomeIcon icon={faUser} /> 
                  </Dropdown.Toggle>

                  <Dropdown.Menu>

                    <Dropdown.Item>
                        <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
                            Đăng nhập
                        </Link>
                      </Dropdown.Item>
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
                </Dropdown> */}
                {temp}
              </div>
            </div>
          </nav>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/student" element={<Student/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/update" element={<Update/>} />
          <Route path="/edit-user" element={<EditAccount/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/changepassword" element={<ChangePassWord/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;