import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AccountProvider} from './context/UserContext';
import {ShowModalProvider} from './context/ShowModalContext';
import {PaginationProvider} from './context/PaginationContext';


//import AppRouter from './AppRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode> 
    <PaginationProvider>
      <ShowModalProvider>
        <AccountProvider>
          <App />  
        </AccountProvider>   
      </ShowModalProvider>   
    </PaginationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
