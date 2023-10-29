import  React, {Component, useEffect, useState, ChangeEvent, FormEvent} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { error } from 'console';
import { title } from 'process';

interface Student{
    id: number;
    name: string;
    address: string;
}

const GetStudents = () => {
    const [data, setdata] = useState<Array<Student>>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [searchText, setSearchText] = useState('');

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
    <div className='container'>
        <h2>Students List</h2>
        <a href="/create" className='btn btn-success'>Add</a> <br /><br />
        <input type="text" value={searchText}
        onChange={handleSearchInputChange}
        placeholder="Search" className='form-control'/>
        <table className='table'>
      <thead>
        <tr>      
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
        </tr>
      </thead>  
      <tbody>
        {filteredStudents.map((item) => (
          <tr key={item.id}>           
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td><button type='submit' onClick={()=>handleDelete(item.id)} 
            className='btn btn-danger'>Xóa</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};


export default GetStudents;