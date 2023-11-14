import React, { createContext, useContext, useEffect, useState } from 'react';

type ShowContext ={
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}


export const ShowContext = createContext<ShowContext>({} as ShowContext);

export const ShowModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);

    return (
      <ShowContext.Provider value={{show, setShow}}>
        {children}
      </ShowContext.Provider>
    );
  };
  
  export const useShow =() => {
      const context = useContext(ShowContext);
      return context;
  }