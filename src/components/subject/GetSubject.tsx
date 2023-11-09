import  React, {Component, useEffect, useState, ChangeEvent, FormEvent, createContext} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { error } from 'console';
import { title } from 'process';
import { useNavigate } from 'react-router-dom';
import {Subject} from '../../type/Subject';
import SubjectInfo from './SubjectInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';        
import { Modal, Form } from 'react-bootstrap';



const GetSubject:React.FC = () => {
    const [subject, setSubject] = useState<Subject[]>([]);
    const [searchText, setSearchText] = useState('');

    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(0);
    const [ten, setTen] = useState('');
    const [ngaybd, setNgaybd] = useState('');
    const [ngaykt, setNgaykt] = useState('');
    const [soluong, setSoluong] = useState(0);

  useEffect(() => {
    filterSubject(searchText);
  }, [searchText]);


  const handleDelete = async(id: number) =>{
    try {
      await axios.delete(`http://localhost:3080/monhoc/${id}`);
      setSubject(subject.filter((post) => post.id !== id));
      alert("Data delete Successfully!")
    } catch (error) {
      // Xử lý lỗi (nếu có)
      console.log(error);
    }
  };


  const handleUpdate = async(id: number) => {
    
  }

  //===================================================================================
  const filterSubject = async(searchText: string) => {
          if (searchText.trim() === '') {
            const response = await fetch('http://localhost:3080/monhoc');
            const data = await response.json();
            setSubject(data);
        } else {
          const filtered = subject.filter(
            (subject) =>
                subject.ngaybd.toLowerCase().includes(searchText.toLowerCase()) ||
                subject.ngaykt.toLowerCase().includes(searchText.toLowerCase()) ||
                subject.soluong.toString().includes(searchText.toLowerCase()) ||
                subject.ten.toLowerCase().includes(searchText.toLowerCase()) ||
                subject.id.toString().includes(searchText.toLowerCase())
          );
          setSubject(filtered);
        }
    }


  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    filterSubject(searchText);
  };

  const handleShow = (subject: Subject | null) => {
    setSelectedSubject(subject);
    setTen(subject ? subject.ten : '');
    setNgaybd(subject ? subject.ngaybd : '');
    setNgaykt(subject ? subject.ngaykt : '');
    setSoluong(subject ? subject.soluong : 0);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedSubject(null);
    setTen('');
    setNgaybd('');
    setNgaykt('');
    setSoluong(0);
    setShow(false);
  };

  const handleSubmit = async () => {
    //event.preventDefault();
    try {
      let ngaybdtemp = ngaybd.toString();
      let ngaykttemp = ngaybd.toString();
      console.log(ten);
      if (selectedSubject !== null) {
        await axios.put(`http://localhost:3080/monhoc/${selectedSubject.id}`,
         { ten, ngaybd, ngaykt, soluong });
      } else {
        // Create new subject
        await axios.post('http://localhost:3080/monhoc', { ten, ngaybd, ngaykt, soluong });
      }
      filterSubject(searchText);
      handleClose();
    } catch (error) {
      console.error('Error creating/updating subject:', error);
    }
  }
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const soluong = isNaN(value) ? 0 : value;
    setSoluong(soluong);
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
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>{ten ? 'Edit' : 'Add'} Course</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Subject name</Form.Label>
                    <Form.Control
                      type="Text" value={ten}
                      placeholder="Subject name"
                      autoFocus
                      onChange={e => setTen(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Start day</Form.Label>
                    <Form.Control
                      type="date" value={ngaybd}
                      placeholder="Start day"  
                      onChange={e => setNgaybd(e.target.value)}            
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>End day</Form.Label>
                    <Form.Control
                      type="date" value={ngaykt}
                      placeholder="End day"
                      onChange={e => setNgaykt(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="Text" value={soluong}
                      placeholder="Quantity"
                      onChange={handleChangeQuantity}
                    />
                  </Form.Group>
      
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
              </div>
            <div className='col-md-10'>
            <input type="text" value={searchText}
            onChange={handleSearchInputChange}
            placeholder="Search" className='form-control' style={{width: 300}}/> <br />
            </div>
        </div>  
          
      <table className='table table-success table-striped' >
      <thead>
        <tr>      
          <th>Mã môn học</th>
          <th>Tên môn học</th>
          <th>Ngày bắt đầu</th>
          <th>Ngày kết thúc</th>
          <th>Số lượng học viên</th>
          <th>Hành động</th>
        </tr>
      </thead>  
      <tbody>
        {subject.map((subject) => (
            <SubjectInfo key={subject.id} ma = {subject.id} ten = {subject.ten} 
            ngaybd = {subject.ngaybd} ngaykt = {subject.ngaykt} soluong={subject.soluong}
            onDelete={() => {handleDelete(subject.id)}}
            onUpdate={() => {handleShow(subject)}}
            />          
        ))}
      </tbody>
    </table>
    <br />

  </div>
  );
};


export default GetSubject;