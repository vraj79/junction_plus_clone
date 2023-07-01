import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import AuthContextProvider from './Context/AuthContext/AuthContextProvider';
import GenreData from './Components/GenreData';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ChakraProvider>
        <GenreData>
          <App />
        </GenreData>
      </ChakraProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
