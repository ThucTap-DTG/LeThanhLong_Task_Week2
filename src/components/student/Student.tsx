import  React, {Component, useEffect, useState, ChangeEvent, FormEvent, createContext} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';
import { error } from 'console';
import { title } from 'process';
import StudentInfo from './StudentInfo';
import { Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalTitle from '../Modals/ModalTitle';
import ModalBody from '../Modals/ModalBody';
import ModalFooter from '../Modals/ModalFooter';

interface Student{
    id: number;
    name: string;
    address: string;
}


const GetStudents = () => {
  const navigate = useNavigate();
    const [data, setdata] = useState<Student[]>([]);
    //const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [searchText, setSearchText] = useState('');
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [show, setShow] = useState(false);
    //const [editStudent, seteditStudent] = useState<Student | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<Student | null>(null);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    filterStudents(searchText);
  }, [searchText]);

  //================================Delete=============================================
  const handleDelete = async(id: number) =>{
    try {
      await axios.delete(`http://localhost:3030/students/${id}`);
      setdata(data.filter((post) => post.id !== id));
      alert("Data delete Successfully!");
    } catch (error) {
      // Xử lý lỗi (nếu có)
      console.log(error);
    }
  };

  //===================================================================================
  const filterStudents = async(searchText: string) => {
    if(localStorage.getItem('MatKhau') !== null){
          if (searchText.trim() === '') {
            const res = await axios.get('http://localhost:3030/students')
            .then(res => setdata(res.data));
            const response = await fetch('http://localhost:3030/students');
            const data = await response.json();
            setdata(data);
        } else {
          const filtered = data.filter(
            (student) =>
              student.name.toLowerCase().includes(searchText.toLowerCase()) ||
              student.address.toLowerCase().includes(searchText.toLowerCase()) ||
              student.id.toString().includes(searchText.toLowerCase())
          );
          setdata(filtered);
        }
    }
    else{
      navigate('/');
    }
  };

  const handleShow = (student: Student | null) => {
    setSelectedSubject(student);
    setId(student ? student.id: id);
    setName(student ? student.name : '');
    setAddress(student ? student.address : '');  
    setShow(true);
  };

  const handleClose = () => {
    setSelectedSubject(null);
    setId(0);
    setName('');
    setAddress('');
    setShow(false);
  };

  const handleSubmit = async () => {
    //event.preventDefault();
    try {
      if (selectedSubject !== null) {
        await axios.put(`http://localhost:3030/students/${selectedSubject.id}`,
         { name, address });
      } else {
        // Create new subject
        await axios.post('http://localhost:3030/students', { name, address });
      }
      filterStudents(searchText);
      handleClose();
    } catch (error) {
      console.error('Error creating/updating subject:', error);
    }
  }
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    filterStudents(searchText);
  };
  //====================================================================================
  return (
    <div className='container list-student' style={{boxShadow: '0 0 10px gray', marginTop: 10, borderRadius:10}}>
      <br />
        <div className='row'>
        <div className='col-md-2'>
            <Button variant="primary" onClick={() => setShow(true)}>
                Create
            </Button>
            <Modal show={show} 
            onHide={handleClose}
            >
              <Modal.Header closeButton>
                  <ModalTitle title = {id ? 'Update Student' : 'Create Student'} />
              </Modal.Header>
              <ModalBody>
              <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Student name</Form.Label>
                    <Form.Control
                      type="Text" value={name}
                      placeholder="Student name"
                      autoFocus
                      onChange={e => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text" value={address}
                      placeholder="Address"  
                      onChange={e => setAddress(e.target.value)}            
                    />
                  </Form.Group>                       
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </Modal>
              </div>
            <div className='col-md-10'>
            <input type="text" value={searchText}
        onChange={handleSearchInputChange}
        placeholder="Search" className='form-control' style={{width: 300}}/> <br />
            </div>
        </div>             
      <table className='table table-success table-striped'>
      <thead>
        <tr>      
          <th>MSSV</th>
          <th>Họ và Tên</th>
          <th>Đại chỉ</th>
          <th>Hành động </th>
        </tr>
      </thead>  
      <tbody>
        {data.map((student) => (
           <StudentInfo key={student.id} id = {student.id} name = {student.name} 
           address = {student.address} 
           onDelete={() => {handleDelete(student.id)}}
           onUpdate={() => {handleShow(student)}}/>          
        ))}
      </tbody>
    </table>
    <br />
  </div>
  );
};


export default GetStudents;