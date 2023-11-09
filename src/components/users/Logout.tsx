import React, {useEffect} from 'react';
import { useNavigate  } from 'react-router-dom'; 

const Logout = () => {
    const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('TenDangNhap');
    localStorage.removeItem('MatKhau');
  
    navigate('/');
  }, [navigate]);

  return null;
}
export default Logout;