import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GardenAppNavBar from "../GardenAppNavBar";
import GardenList from "./GardenList";
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../store/authSlice';

const GardenApp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [gardens, setGardens] = useState([]);
  const navigate = useNavigate();
  
  const logout = () => {
    dispatch(logoutAction());
  };  

  // Memoize the getAuthHeader function so that it only changes when token changes
  const getAuthHeader = useCallback(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  // Wrap fetchGardens in useCallback so that it re-runs only when getAuthHeader changes
  const fetchGardens = useCallback(async () => {
    try {
      const config = {
        ...getAuthHeader(),
        params: { userId: user.id }
      };
      const response = await axios.get("/api/gardens", config);
      console.log('response = ', response.data)
      setGardens(response.data);
    } catch (error) {
      console.error("Error fetching gardens:", error);
    }
  }, [getAuthHeader, user]);
  
  // Fetch gardens on component mount and when fetchGardens changes
  useEffect(() => {
    fetchGardens();
  }, [fetchGardens]);

  // Update an existing garden
  const updateGarden = async (gardenId, updatedData) => {
    try {
      await axios.put(`/api/gardens/${gardenId}`, updatedData, getAuthHeader());
      fetchGardens();
    } catch (error) {
      console.error("Error updating garden:", error);
    }
  };

  // Delete a garden
  const deleteGarden = async (gardenId) => {
    try {
      await axios.delete(`/api/gardens/${gardenId}`, getAuthHeader());
      fetchGardens();
    } catch (error) {
      console.error("Error deleting garden:", error);
    }
  };

  // Add a new garden
  const addGarden = async (newData) => {
    try {
      await axios.post("/api/gardens", newData, getAuthHeader());
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
      <GardenAppNavBar user={user} onLogout={logout} />
      <div style={{ padding: "80px 20px" }}>
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
