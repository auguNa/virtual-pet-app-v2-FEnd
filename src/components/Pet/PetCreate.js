import React, { useState } from 'react';
import { createPet } from '../../services/petService';
import { useNavigate } from 'react-router-dom';

function PetCreate() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPet({ name, color });
      navigate('/');
    } catch (error) {
      console.error('Failed to create pet', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} required />
      <button type="submit">Create Pet</button>
    </form>
  );
}

export default PetCreate;
