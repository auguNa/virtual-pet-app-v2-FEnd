import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserPage from './components/User/UserPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminPage from './components/Admin/AdminPage';
import PetCreate from './components/Pet/PetCreate';
import PetDetail from './components/Pet/PetDetail';
import Navbar from './components/common/Navbar';
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './components/Home/HomePage';

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
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="users" element={<AdminPage />} /> {/* Admin page for managing users */}
            {/* Define other admin routes if needed */}
            <Route path="reports" element={<div>Reports Page</div>} /> {/* Placeholder for reports */}
            <Route path="settings" element={<div>Admin Settings Page</div>} /> {/* Placeholder for settings */}
          </Route>
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/create-pet" element={<PetCreate />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to HomePage */}
      </Routes>
    </Router>
  );
}

export default App;
