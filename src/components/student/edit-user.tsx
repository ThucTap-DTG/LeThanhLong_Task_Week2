import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AccountContext, AccountProvider ,useAcc} from '../../context/UserContext';
import {User} from '../../type/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPenSquare, faPlus, faTrash , faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
  const {acc, setAcc} = useAcc();
  const [temp, setTemp] = useState<User>(acc);
  
  const hanldEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAcc(temp);
    // const { localStorage } = window;
    // const ObjAccount = { username: temp.username,
    //                    password: temp.password,
    //                    address: temp.address,
    //                    phone: temp.phone,
    //                    email: temp.email };
    // const objectString = JSON.stringify(ObjAccount);
    // localStorage.setItem('ObjAccount', objectString);
    // localStorage.removeItem('MatKhau');
    //  localStorage.setItem('username', temp.username);
    //  localStorage.setItem('password', temp.password);
     localStorage.setItem('address', temp.address);
     localStorage.setItem('phone', temp.phone);
     localStorage.setItem('email', temp.email);
     alert('Update user Successfully!')
  }
  const navigate = useNavigate();
  useEffect(() =>{
    if(localStorage.getItem('MatKhau') === null){
      navigate('/');
    }
  }, [])
  return (
    <div className='container'>
      <br />
      <form onSubmit={hanldEdit} style={{width: 300}}
      className='d-flex w-100 vh-0 justify-content-center align-items-center'>
        <div className='w-50 border bg-light p-5' style={{borderRadius: 10}}>
        {/* <div>
          <label>Username:</label>
          <input type="text" value={temp.username} readOnly
          onChange={e => setTemp({...temp, username: e.target.value})}
          className='form-control'/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={temp.password}  className='form-control'
          onChange={e => setTemp({...temp, password: e.target.value})}/>
        </div> */}
        <div>
          <label>Address:</label>
          <input type="text" value={temp.address} className='form-control'
          onChange={e => setTemp({...temp, address: e.target.value})}/>
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={temp.phone} className='form-control'
          onChange={e => setTemp({...temp, phone: e.target.value})}/>
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={temp.email} className='form-control'
          onChange={e => setTemp({...temp, email: e.target.value})}/>
        </div> <br />
        <button className='btn btn-primary'>
            <FontAwesomeIcon icon={faFloppyDisk} /> Save
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccount;