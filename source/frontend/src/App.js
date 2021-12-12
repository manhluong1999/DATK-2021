import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AccountManagement from './pages/AccountManagement/AccountManagement';
import HomePage from './pages/Dashboard/Dashboard';
import AboutMe from './pages/AboutMe/AboutMe'
import Lectures from './pages/Lectures/Lectures'
import Projects from './pages/Projects/Projects'
import Software from './pages/Software/Software'
import Publications from './pages/Publications/Publications'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import useToken from './useToken';


const App = () => {
  const { token } = useToken()

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AboutMe />}>
          </Route>
          <Route path="/lectures" element={<Lectures />}>
          </Route>
          <Route path="/projects" element={<Projects />}>
          </Route>
          <Route path="/software" element={<Software />}>
          </Route>
          <Route path="/publications" element={<Publications />}>
          </Route>
          <Route path="/account" element={<AccountManagement />}>
          </Route>
          <Route path="/login" element={token ? <AboutMe /> : <Login />}>
          </Route>
          <Route path="/signup" element={<Signup />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;