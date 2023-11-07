import { useNavigate } from 'react-router-dom';
import  React, {Component, useEffect, useState, ChangeEvent, FormEvent} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';                                                                                       

function ChangePassWord(){
    const navigate = useNavigate();
    const [pwOld, setPwOld] = useState('');
    const [pwNew, setPwNew] = useState('');
    const [pwNewEnter, setPwNewEnter] = useState('');
    const handleSubmit =(event: React.FormEvent<HTMLFormElement>) =>{
        if(localStorage.getItem('MatKhau') !== pwOld){
            alert('The old password is incorrect!');
        }
        else if(pwNew !== pwNewEnter){
            alert('Password must be the same!');
        }else{
            localStorage.setItem('MatKhau', pwNew);
            alert('Changed password successfully!');
        }
    }

    return(
        <div className='container'>
            <br />
            <form onSubmit={handleSubmit} style={{width: 300}}
            className='d-flex w-100 vh-0 justify-content-center align-items-center'>
                <div className='w-50 border bg-light p-5' style={{borderRadius: 5}}>
                    <div>
                        <label htmlFor="name">Old Password:</label>
                        <input
                            type="password" id="name" className='form-control' placeholder='Enter old password'
                            onChange={(e) => setPwOld(e.target.value)}
                            />
                    </div>
                    <div>
                        <label htmlFor="name">New Password:</label>
                        <input
                            type="password" id="address" className='form-control' placeholder='Enter new password'
                            onChange={(e) => setPwNew(e.target.value)}
                            />
                    </div>
                    <div>
                        <label htmlFor="name">Enter a new password:</label>
                        <input
                            type="password" id="address" className='form-control' placeholder='Enter new password'
                            onChange={(e) => setPwNewEnter(e.target.value)}
                            />
                    </div><br />
                    <button className='btn btn-primary'>
                        <FontAwesomeIcon icon={faFloppyDisk} /> Save
                    </button>
                </div>
                </form>
        </div> 
    )
}

export default ChangePassWord