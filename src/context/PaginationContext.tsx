import React, { createContext, useContext, useEffect, useState } from 'react';

type PaginationContextProps ={
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
}


export const PaginationContext = createContext<PaginationContextProps>({} as PaginationContextProps);

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPage, setTotalPage] = useState(0);
    return (
      <PaginationContext.Provider value={{page, setPage, limit, setLimit, totalPage, setTotalPage}}>
        {children}
      </PaginationContext.Provider>
    );
  };
  
  export const usePagination =() => {
      const context = useContext(PaginationContext);
      return context;
  }