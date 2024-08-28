import React, { useState, useEffect } from 'react';
import { getPet } from '../../services/petService';
import { useParams } from 'react-router-dom';

function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState({});

  useEffect(() => {
    async function fetchPet() {
      const response = await getPet(id);
      setPet(response.data);
    }
    fetchPet();
  }, [id]);

  return (
    <div>
      <h2>{pet.name}</h2>
      <p>Color: {pet.color}</p>
      <p>Energy Level: {pet.energyLevel}</p>
      <p>Mood: {pet.mood}</p>
    </div>
  );
}

export default PetDetail;
