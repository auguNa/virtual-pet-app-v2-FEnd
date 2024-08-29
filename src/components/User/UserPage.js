import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    // Fetch the user's pets from the backend
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/pets', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets', error);
      }
    };

    fetchPets();
  }, [authToken]);

  const handleCreatePet = () => {
    navigate('/create-pet');
  };

  const handleDeletePet = async (petId) => {
    try {
      await axios.delete(`http://localhost:8080/api/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPets(pets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.error('Error deleting pet', error);
    }
  };
  const handleAction = async (petId, action) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/pets/${petId}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const updatedPet = response.data;
      setPets(pets.map((pet) => (pet.id === petId ? updatedPet : pet)));
    } catch (error) {
      console.error(`Error performing action ${action} on pet`, error);
    }
  };

  return (
    <div className="container">
      <h2>My Virtual Pets</h2>
      <button onClick={handleCreatePet}>Create New Pet</button>
      <div className="pet-list">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-item">
            <h3>{pet.name}</h3>
            <p>Color: {pet.color}</p>
            <p>Mood: {pet.mood}</p>
            <p>Energy Level: {pet.energy}</p>
            {/* Add more pet details as needed */}
            <button onClick={() => navigate(`/pets/${pet.id}`)}>View / Update</button>
            <button onClick={() => handleDeletePet(pet.id)}>Delete</button>
            {/* New buttons for actions */}
            <button onClick={() => handleAction(pet.id, 'feed')}>Feed</button>
            <button onClick={() => handleAction(pet.id, 'play')}>Play</button>
            <button onClick={() => handleAction(pet.id, 'rest')}>Rest</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;