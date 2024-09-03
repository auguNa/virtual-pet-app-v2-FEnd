// src/components/Admin/ManageUsers.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (authState.role !== 'ADMIN') {
        // Redirect if the user is not an admin
        navigate('/user');
        return; // Prevent further execution
      }

      try {
        const response = await axios.get('http://localhost:8080/api/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log('Fetched users:', response.data); // Debugging line
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error); // Debugging line
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [authState.role, navigate]);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Pets</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <ul>
                  {user.virtualPets && user.virtualPets.length > 0 ? (
                    user.virtualPets.map((pet) => (
                      <li key={pet.id}>
                        {pet.name} (Type: {pet.type}, Color: {pet.color}, Mood: {pet.mood}, Energy: {pet.energy})
                      </li>
                    ))
                  ) : (
                    <li>No pets</li>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
