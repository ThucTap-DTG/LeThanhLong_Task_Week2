import React from 'react';
import { useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPenSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


interface StudentInfoProps {
  id: number;
  name: string;
  address: string;
  onDelete?: () => void;
  onUpdate?: () => void;
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
            <button type='submit' onClick={student.onDelete} className='btn btn-danger' style={{marginRight: 5}}>
            <FontAwesomeIcon icon={faTrash} /> 
            </button>
            <button  onClick={student.onUpdate} className='btn btn-info'>
                <FontAwesomeIcon icon={faPenSquare} /> 
            </button>
        </td>    
    </tr>
  );
};

export default StudentInfo;