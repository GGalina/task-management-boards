import React from 'react';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';

const App: React.FC = () => (
  <>
    <Home />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
);

export default App;
