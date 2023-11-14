import  React, {Component, useEffect, useState, ChangeEvent, FormEvent, createContext} from 'react';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';
import { error } from 'console';
import { title } from 'process';
import StudentInfo from './StudentInfo';
import { Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalForm from '../Modals/ModalForm';
import CusPagination from '../Pagination/CusPagination';
import { ShowContext, ShowModalProvider ,useShow} from '../../context/ShowModalContext';
import { PaginationContext, PaginationProvider , usePagiantion} from '../../context/PaginationContext';

interface Student{
    id: number;
    name: string;
    address: string;
}


const GetStudents = () => {
  const navigate = useNavigate();
    const [data, setdata] = useState<Student[]>([]);

    //const [countRecord, setCountRecord] = useState(0);

    //const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [searchText, setSearchText] = useState('');
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    //const [editStudent, seteditStudent] = useState<Student | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<Student | null>(null);

    const {show, setShow} = useShow();
    const {page, setPage, limit, setLimit, totalPage, setTotalPage} = usePagiantion();

    // const [page, setPage] = useState(1);
    // const limit = 6;
    // const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
      getPageNumber();
    }, [])

    useEffect(() => {
      filterStudents(searchText);
    }, [searchText, page]);

  // useEffect(() => {
  //   fetchStudents();
  // }, [page]);

  // const fetchStudents = async () => {
  //   try {
  //       const response = await fetch(`http://localhost:3030/students?_page=${page}&_limit=${limit}`
  //     );
  //     const lst = await response.json();
  //     setdata(lst);
  //   } catch (error) {
  //     console.error("Error fetching students:", error);
  //   }
  // };

  const getPageNumber = async() => {
    try{
      const response = await fetch(`http://localhost:3030/students`);
      const lst = await response.json();
      const countRecord = lst.length;
      const temp = Math.ceil(Number(countRecord) / limit);
      setTotalPage(temp);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  const handleSetPage = (newPage: number) => {
    setPage(newPage);
  };
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
            const response = await fetch(`http://localhost:3030/students?_page=${page}&_limit=${limit}`);
            const lst = await response.json();
            setdata(lst);
            console.log(data.length);
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
            <ModalForm
              show={show}
              onHide={handleClose}
              title={id ? 'Update Subject' : 'Create Subject'}
              onSave={handleSubmit}             
            >
              <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
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
                      autoFocus
                      onChange={e => setAddress(e.target.value)}
                    />
                  </Form.Group>                                 
                </Form>
            </ModalForm>
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
        <CusPagination 
            page={page}
            handlePageChange={handleSetPage}
            totalPage={totalPage}
        />
    <br />
  </div>
  );
};


export default GetStudents;