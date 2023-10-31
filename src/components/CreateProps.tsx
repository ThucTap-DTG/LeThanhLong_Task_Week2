import React from 'react';
import { useNavigate  } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateProps() {
    const navigate = useNavigate ();

    function NavCreate(){
        navigate('/create');
    }
  return (
   <div>
        <button onClick={NavCreate} className='btn btn-success'>Add</button> <br /><br />
   </div>
  );
};

export default CreateProps;