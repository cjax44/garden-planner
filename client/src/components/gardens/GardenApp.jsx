import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import GardenList from "./GardenList";

const GardenApp = ({ user, onLogout }) => {
  const [gardens, setGardens] = useState([]);
  const navigate = useNavigate();

  // Fetch gardens on component mount
  useEffect(() => {
    fetchGardens();
  }, []);

  const fetchGardens = async () => {
    try {
      const response = await axios.get("/api/gardens");
      setGardens(response.data);
    } catch (error) {
      console.error("Error fetching gardens:", error);
    }
  };

  // Update an existing garden
  const updateGarden = async (gardenId, updatedData) => {
    try {
      await axios.put(`/api/gardens/${gardenId}`, updatedData);
      fetchGardens();
    } catch (error) {
      console.error("Error updating garden:", error);
    }
  };

  // Delete a garden
  const deleteGarden = async (gardenId) => {
    try {
      await axios.delete(`/api/gardens/${gardenId}`);
      fetchGardens();
    } catch (error) {
      console.error("Error deleting garden:", error);
    }
  };

  // Add a new garden
  const addGarden = async (newData) => {
    try {
      await axios.post("/api/gardens", newData);
      fetchGardens();
    } catch (error) {
      console.error("Error creating garden:", error);
    }
  };

  // Navigate to the detailed garden page
  const navigateToGarden = (gardenId) => {
    navigate(`/gardens/${gardenId}`);
  };

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ padding: "20px" }}>
        <h1>Garden Manager</h1>
        <GardenList
          gardens={gardens}
          onUpdate={updateGarden}
          onDelete={deleteGarden}
          onAdd={addGarden}
          onCardClick={navigateToGarden}
        />
      </div>
    </div>
  );
};

export default GardenApp;
