import React, { useState, useEffect } from 'react';
import { getPets } from '../../services/petService';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      const response = await getPets();
      setPets(response.data);
    }
    fetchPets();
  }, []);

  return (
    <div>
      <h2>My Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>{pet.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
