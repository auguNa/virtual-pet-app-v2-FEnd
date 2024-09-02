// src/components/Admin/AdminDashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><button onClick={() => navigate('/admin/users')}>Manage Users</button></li>
        <li><button onClick={() => navigate('/admin/reports')}>View Reports</button></li>
        <li><button onClick={() => navigate('/admin/settings')}>Admin Settings</button></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;