import React from 'react';
import { useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPenSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateProps() {
    const navigate = useNavigate ();

    function NavCreate(){
        navigate('/create');
    }
  return (
   <div>
        <button onClick={NavCreate} className='btn btn-success'>
            <FontAwesomeIcon icon={faPlus} /> Add new
        </button> <br /><br />
   </div>
  );
};

export default CreateProps;