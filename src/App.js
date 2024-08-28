import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserPage from './components/User/UserPage';
import PetCreate from './components/Pet/PetCreate';
import PetDetail from './components/Pet/PetDetail';
import Navbar from './components/common/Navbar';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protect routes with PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<UserPage />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/create-pet" element={<PetCreate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
