import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setPet(response.data);
        setName(response.data.name);
        setColor(response.data.color);
        setType(response.data.type);
      } catch (error) {
        console.error("Error fetching pet details", error);
      }
    };

    fetchPet();
  }, [id, authToken]);

  const handleUpdatePet = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/pets/${id}`,
        { name, color },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      navigate("/user"); // Redirect back to user page after update
    } catch (error) {
      console.error("Error updating pet", error);
    }
  };

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Edit Pet</h2>
      <form onSubmit={handleUpdatePet}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        

        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Pet</button>

      </form>
    </div>
  );
};

export default PetDetail;
