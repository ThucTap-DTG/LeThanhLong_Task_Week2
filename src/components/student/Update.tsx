import { useNavigate } from 'react-router-dom';
import  React, {Component, useEffect, useState, ChangeEvent, FormEvent} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPenSquare, faPlus, faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';                                                                                         

interface Student{
    id: number;
    name: string;
    address: string;
}

function Update(){
    const {state} = useLocation();
    const { id, color } = state;
    // const {id} = useParams();
    const [inputData, setInputData] = useState({name: '', address: ''})
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3030/students/'+ id)
        .then(res => setInputData(res.data))
    }, [])

    const handleSubmit =(event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        axios.put('http://localhost:3030/students/' + id , inputData)
        .then(res =>{
            alert("Data Update Successfully!");
            navigate('/student');
        })       
    }

    return(
        <div className='container'>
            <br />
            <form onSubmit={handleSubmit} style={{width: 300}}
            className='d-flex w-100 vh-0 justify-content-center align-items-center'>
                <div className='w-50 border bg-light p-5' style={{borderRadius: 5}}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text" id="name" className='form-control' value={inputData.name}
                            onChange={e => setInputData({...inputData, name: e.target.value})}
                            />
                    </div>
                    <div>
                        <label htmlFor="name">Address:</label>
                        <input
                            type="text" id="address" className='form-control' value={inputData.address}
                            onChange={e => setInputData({...inputData, address: e.target.value})}
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

export default Update