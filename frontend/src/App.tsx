import React from 'react';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';

const App: React.FC = () => (
  <>
    <Home />
    <ToastContainer position="top-right" autoClose={3000} />
  </>
);

export default App;
