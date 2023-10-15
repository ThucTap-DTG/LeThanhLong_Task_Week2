import { useNavigate } from 'react-router-dom';
import  React, {Component, useEffect, useState, ChangeEvent, FormEvent} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';                                                                                          

function Create(){
    const [inputData, setInputData] = useState({name: '', address: ''})
    const navigate = useNavigate();

    const handleSubmit =(event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        axios.post('http://localhost:3030/students', inputData)
        .then(res =>{
            alert("Data Posted  Successfully!");
            navigate('/student');
        })
    }

    return(
        <div className='container'>
            <form onClick= {handleSubmit}  style={{width: 300}}
            className='d-flex w-100 vh-100 justify-content-center align-items-center'>
                <div className='w-50 border bg-light p-5'>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text" id="name" className='form-control'
                            onChange={e => setInputData({...inputData, name: e.target.value})}
                            />
                    </div>
                    <div>
                        <label htmlFor="name">Address:</label>
                        <input
                            type="text" id="address" className='form-control'
                            onChange={e => setInputData({...inputData, address: e.target.value})}
                            />
                    </div><br />
                    <button className='btn btn-primary'>Add</button>
                </div>
                </form>
        </div>
    )
}

export default Create