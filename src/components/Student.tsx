import  React, {Component, useEffect, useState, ChangeEvent, FormEvent, createContext} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { error } from 'console';
import { title } from 'process';
import StudentInfo from './StudentInfo';
import CreateProps from './CreateProps';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

interface Student{
    id: number;
    name: string;
    address: string;
}


const GetStudents = () => {
    const [data, setdata] = useState<Array<Student>>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [searchText, setSearchText] = useState('');

    const [editStudent, seteditStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterStudents(searchText);
  }, [searchText]);
//================================GetPost=============================================

  const fetchData = async () => {
    try{
      // const res = await axios.get('http://localhost:3030/students')
      // .then(res => setdata(res.data));
      const response = await fetch('http://localhost:3030/students');
      const data = await response.json();
      setdata(data);
      setFilteredStudents(data);
    }
    catch(error){
      console.log(error);
    }
  };
  //===================================================================================
  //================================Delete=============================================
  const handleDelete = async(id: number) =>{
    try {
      await axios.delete(`http://localhost:3030/students/${id}`);
      setdata(data.filter((post) => post.id !== id));
      alert("Data delete Successfully!")
    } catch (error) {
      // Xử lý lỗi (nếu có)
      console.log(error);
    }
  };

  //===================================================================================
  const filterStudents = (searchText: string) => {
    if (searchText.trim() === '') {
      setFilteredStudents(data);
    } else {
      const filtered = data.filter(
        (student) =>
          student.name.toLowerCase().includes(searchText.toLowerCase()) ||
          student.address.toLowerCase().includes(searchText.toLowerCase()) ||
          student.id.toString().includes(searchText.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  // useEffect(() => {
  //   filterStudents();
  // }, [searchText]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    filterStudents(searchText);
  };
  //====================================================================================
  return (
    <div className='container list-student bg-light ' style={{marginTop: 15, borderRadius: 10}}>
      <br /> 
      <div className='row'>
          <div className='col-md-2'><CreateProps /></div>
          <div className='col-md-3'>
          <input type="text" value={searchText}
          onChange={handleSearchInputChange}
          placeholder="Search" className='form-control' style={{width: 300}}/> <br />
          
          </div>
      </div>      
       
        <table className='table table-striped table-hover'>
        <thead>
          <tr>      
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Đại chỉ</th>
            <th>Hành động</th>
            
          </tr>
        </thead>  
      <tbody>
        {filteredStudents.map((student) => (
           <StudentInfo key={student.id} id = {student.id} name = {student.name} 
           address = {student.address} onDelete={() => {handleDelete(student.id)}}/>          
        ))}
      </tbody>
    </table>
  </div>
  );
};


export default GetStudents;