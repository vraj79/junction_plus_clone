import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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
