import React, { createContext, useContext, useEffect, useState } from 'react';
import {User} from '../type/User';

// Định nghĩa kiểu dữ liệu cho tài khoản

type UserContext ={
  acc: User;
  setAcc: React.Dispatch<React.SetStateAction<User>>;
}


// Tạo context AccountContext
export const AccountContext = createContext<UserContext>({} as UserContext);

// Tạo provider cho AccountContext
export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [acc, setAcc] = useState<User>({} as User);
  
  useEffect(() =>{
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const address = localStorage.getItem('address');
    const phone = localStorage.getItem('phone');
    const email = localStorage.getItem('email');

    if(password){
        const user: User = {
          username: username ? username : '',
          password: password ? password : '',
          address: address ? address : '',
          phone: phone ? phone : '',
          email: email ? email : '',
        };
        setAcc(user);
    }
  },[])
  return (
    <AccountContext.Provider value={{acc, setAcc}}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAcc =() => {
    const context = useContext(AccountContext);
    return context;
}