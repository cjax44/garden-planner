import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GardenAppNavBar from '../GardenAppNavBar';
import GardenProperties from './GardenProperties';
import GardenWorkArea from './GardenWorkArea';
import '../../styles/gardens/GardenDetail.css';

const GardenDetail = ({ garden: initialGarden, user, onLogout }) => {
  const params = useParams();
  const gardenId = params.id
  const [garden, setGarden] = useState(initialGarden);
  const [loading, setLoading] = useState(!initialGarden);
  const [dimensions, setDimensions] = useState({
    width: initialGarden?.width || 10,
    height: initialGarden?.height || 10,
  });

  useEffect(() => {
    if (!garden) {
      axios.get(`/api/gardens/${gardenId}`)
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
  }, [garden, gardenId]);

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({ ...prev, [name]: Number(value) }));
  };

  if (loading) {
    return (
      <div>
        <GardenAppNavBar user={user} onLogout={onLogout} />
        <div className="garden-detail">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GardenAppNavBar user={user} onLogout={onLogout} />
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

GardenDetail.defaultProps = {
  user: null,
  onLogout: () => {},
};

export default GardenDetail;
