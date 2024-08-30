import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AllPets.css';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    // Fetch all pets from the backend
    const fetchAllPets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/pets', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPets(response.data);
      } catch (error) {
        setError('Error fetching pets');
        console.error('Error fetching all pets', error);
      }
    };

    fetchAllPets();
  }, [authToken]);

  const handleDeletePet = async (petId) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPets(pets.filter((pet) => pet.id !== petId));
    } catch (error) {
      setError('Error deleting pet');
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
      <h2>All Virtual Pets</h2>
      {error && <p className="error">{error}</p>}
      <div className="pet-list">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-item">
            <h3>{pet.name}</h3>
            <p>Color: {pet.color}</p>
            <p>Mood: {pet.mood}</p>
            <p>Energy Level: {pet.energy}</p>
            <p>Owner: {pet.ownerName}</p> {/* Display the pet's owner */}
            <button onClick={() => navigate(`/pets/${pet.id}`)}>View / Update</button>
            <button onClick={() => handleDeletePet(pet.id)}>Delete</button>
            {/* Action buttons */}
            <button onClick={() => handleAction(pet.id, 'feed')}>Feed</button>
            <button onClick={() => handleAction(pet.id, 'play')}>Play</button>
            <button onClick={() => handleAction(pet.id, 'rest')}>Rest</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPets;
