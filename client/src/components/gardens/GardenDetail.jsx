import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import GardenAppNavBar from '../GardenAppNavBar';
import GardenProperties from './GardenProperties';
import GardenWorkArea from './GardenWorkArea';
import '../../styles/gardens/GardenDetail.css';

const GardenDetail = ({ garden: initialGarden }) => {
  const { id: gardenId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [garden, setGarden] = useState(initialGarden);
  const [loading, setLoading] = useState(!initialGarden);
  const [dimensions, setDimensions] = useState({
    width: initialGarden?.width || 10,
    height: initialGarden?.height || 10,
  });

  useEffect(() => {
    // Only fetch garden details if garden is not already provided and we have a token
    if (!garden && token) {
      axios
        .get(`/api/gardens/${gardenId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setGarden(response.data);
          setDimensions({
            width: response.data.width || 10,
            height: response.data.height || 10,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching garden data:", error);
          setLoading(false);
        });
    }
  }, [garden, gardenId, token]);

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({ ...prev, [name]: Number(value) }));
  };

  if (loading) {
    return (
      <div>
        <GardenAppNavBar />
        <div className="garden-detail">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GardenAppNavBar />
      <div className="garden-detail">
        <h1>{garden.name}</h1>
        <div className="layout-container">
          <GardenProperties
            dimensions={dimensions}
            handleDimensionChange={handleDimensionChange}
          />
          <GardenWorkArea />
        </div>
      </div>
    </div>
  );
};

export default GardenDetail;
