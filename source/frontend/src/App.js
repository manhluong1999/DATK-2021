import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import AccountManagement from './pages/AccountManagement/AccountManagement';
import HomePage from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import useToken from './useToken';


const App = () => {
  const {token} = useToken()

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
          </Route>
          <Route path="/account" element={<AccountManagement />}>
          </Route>
          <Route path="/login" element={token ? <Navigate to='/' /> :<Login />}>
          </Route>
          <Route path="/signup" element={<Signup />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;