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
  
  // Changed raisedBeds to be an array of objects
  const [raisedBeds, setRaisedBeds] = useState(initialGarden?.raisedBeds || []);
  
  // New states for additional garden properties
  const [notes, setNotes] = useState(initialGarden?.notes || '');
  const [sunExposure, setSunExposure] = useState(initialGarden?.sunExposure || 'Full Sun');
  const [soilType, setSoilType] = useState(initialGarden?.soilType || 'Loam');

  useEffect(() => {
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
          setRaisedBeds(response.data.raisedBeds || []);
          setNotes(response.data.notes || '');
          setSunExposure(response.data.sunExposure || 'Full Sun');
          setSoilType(response.data.soilType || 'Loam');
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

  // Raised Beds handlers
  const addRaisedBed = () => {
    // Adds a new raised bed with default dimensions
    setRaisedBeds([...raisedBeds, { length: 4, width: 2 }]);
  };

  const updateRaisedBed = (index, field, value) => {
    const updatedBeds = raisedBeds.map((bed, i) =>
      i === index ? { ...bed, [field]: Number(value) } : bed
    );
    setRaisedBeds(updatedBeds);
  };

  const removeRaisedBed = (index) => {
    setRaisedBeds(raisedBeds.filter((_, i) => i !== index));
  };

  // Handlers for additional properties
  const handleNotesChange = (e) => setNotes(e.target.value);
  const handleSunExposureChange = (e) => setSunExposure(e.target.value);
  const handleSoilTypeChange = (e) => setSoilType(e.target.value);

  const saveGarden = () => {
    const updatedGarden = {
      ...garden,
      width: dimensions.width,
      height: dimensions.height,
      // Convert raised beds array to a JSON string if you’re storing it that way
      raisedBeds: raisedBeds,
      notes,
      sunExposure,
      soilType,
    };
  
    axios.put(`/api/gardens/${gardenId}`, updatedGarden, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setGarden(response.data);
      // Optionally show a success message
    })
    .catch(error => {
      console.error("Error updating garden:", error);
    });
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
            raisedBeds={raisedBeds}
            addRaisedBed={addRaisedBed}
            updateRaisedBed={updateRaisedBed}
            removeRaisedBed={removeRaisedBed}
            notes={notes}
            handleNotesChange={handleNotesChange}
            sunExposure={sunExposure}
            handleSunExposureChange={handleSunExposureChange}
            soilType={soilType}
            handleSoilTypeChange={handleSoilTypeChange}
            saveGarden={saveGarden}
          />
          <GardenWorkArea />
        </div>
      </div>
    </div>
  );
};

export default GardenDetail;
