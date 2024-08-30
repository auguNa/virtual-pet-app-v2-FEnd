import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserPage from './components/User/UserPage';
import PetCreate from './components/Pet/PetCreate';
import PetDetail from './components/Pet/PetDetail';
import Navbar from './components/common/Navbar';
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './components/Home/HomePage'; // Import the HomePage component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protect routes with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<UserPage />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/create-pet" element={<PetCreate />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to HomePage */}
      </Routes>
    </Router>
  );
}

export default App;
