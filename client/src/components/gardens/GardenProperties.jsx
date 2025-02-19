import React from 'react';

const GardenProperties = ({ dimensions, handleDimensionChange }) => {
  return (
    <div className="left-panel">
      <h2>Garden Properties</h2>
      <div className="property">
        <label>
          Width:
          <input
            type="number"
            name="width"
            value={dimensions.width}
            onChange={handleDimensionChange}
          />
        </label>
      </div>
      <div className="property">
        <label>
          Height:
          <input
            type="number"
            name="height"
            value={dimensions.height}
            onChange={handleDimensionChange}
          />
        </label>
      </div>
      {/* Additional properties can be added here */}
    </div>
  );
};

export default GardenProperties;
