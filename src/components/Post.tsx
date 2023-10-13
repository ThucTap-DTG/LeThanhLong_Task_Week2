import  React, {Component, useEffect, useState, ChangeEvent, FormEvent} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { error } from 'console';
import { title } from 'process';

interface Post{
    userId: number;
    id: number;
    title: string;
    body: string;
}

const GetPost = () => {
    const [data, setdata] = useState<Array<Post>>([]);
    const [postId, setPostId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

//================================GetPost=============================================

  const fetchData = async () => {
    try{
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setdata(res.data);
    }
    catch(error){
      console.log(error);
    }
    // fetch('https://jsonplaceholder.typicode.com/posts')
    // .then(res => res.json())
    // .then(data => {
    //     setdata(data);
    // })
  };
  //===================================================================================
  //================================Delete=============================================
  const handleDelete = async(postId: number) =>{
    try {
      // Gửi yêu cầu DELETE đến API để xóa bài viết
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  
      // Cập nhật danh sách bài viết và loại bỏ bài viết đã bị xóa
      setdata(data.filter((post) => post.id !== postId));
    } catch (error) {
      // Xử lý lỗi (nếu có)
      console.log(error);
    }
  };

  //===================================================================================

  const handleSubmit = async () => {  
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { title, body });
      //console.log('New post:', response.data);
      // Xử lý thành công, reset trường dữ liệu
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error adding post:', error);
      // Xử lý lỗi
    }
  };

  //====================================================================================
  return (
    <div className='container'>
      <form onClick= {handleSubmit} className='form-add'>
      <div>
        <label htmlFor="title">Id:</label>
        <input
          type="text" id="id" className='form-control'
          onChange={(e) => setPostId(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text" id="title" value={title} className='form-control'
          onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea id="body"value={body} className='form-control'
          onChange={(e) => setBody(e.target.value)}>          
          </textarea>
      </div><br />
      <button type="submit" className='btn btn-primary'>Add</button>
    </form>

        <h2>Post List</h2>
        <table className='table'>
      <thead>
        <tr>      
          <th>ID</th>
          <th>Name</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>           
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.body}</td>
            <td><button type='submit' onClick={()=>handleDelete(item.id)} 
            className='btn btn-danger'>Xóa</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};


export default GetPost;