import React from 'react';
import { useNavigate  } from 'react-router-dom';

interface StudentInfoProps {
  id: number;
  name: string;
  address: string;
  onDelete?: () => void;
}




function StudentInfo(student: StudentInfoProps) {

    const navigate = useNavigate ();
    //Điều hướng đến trang update
    function NavUpdate(){
        navigate('/update', { state: { id: student.id } });
    }
  return (
    <tr>
        <td>{student.id}</td>
        <td>{student.name}</td>
        <td>{student.address}</td>   
        <td>
            <button type='submit' onClick={student.onDelete} className='btn btn-danger'>Delete</button>
        </td>
        <td>
            <button  onClick={NavUpdate} className='btn btn-info'>Update</button>
        </td>

    </tr>
  );
};

export default StudentInfo;