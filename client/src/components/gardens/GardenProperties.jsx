import React from 'react';

const GardenProperties = ({
  dimensions,
  handleDimensionChange,
  raisedBeds,
  addRaisedBed,
  updateRaisedBed,
  removeRaisedBed,
  notes,
  handleNotesChange,
  sunExposure,
  handleSunExposureChange,
  soilType,
  handleSoilTypeChange,
  saveGarden
}) => {
  return (
    <div className="left-panel">
      <h2>Garden Properties</h2>
      
      {/* Dimensions Section */}
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
      
      {/* Raised Beds Management */}
      <div className="property">
        <h3>Raised Beds</h3>
        {raisedBeds.length > 0 ? (
          raisedBeds.map((bed, index) => (
            <div key={index} className="raised-bed">
              <label>
                Length:
                <input
                  type="number"
                  value={bed.length}
                  onChange={(e) => updateRaisedBed(index, 'length', e.target.value)}
                />
              </label>
              <label>
                Width:
                <input
                  type="number"
                  value={bed.width}
                  onChange={(e) => updateRaisedBed(index, 'width', e.target.value)}
                />
              </label>
              <button onClick={() => removeRaisedBed(index)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No raised beds added.</p>
        )}
        <button onClick={addRaisedBed}>Add Raised Bed</button>
      </div>

      {/* Garden Notes */}
      <div className="property">
        <label>
          Garden Notes:
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Enter garden description or notes here..."
          />
        </label>
      </div>

      {/* Sun Exposure */}
      <div className="property">
        <label>
          Sun Exposure:
          <select value={sunExposure} onChange={handleSunExposureChange}>
            <option value="Full Sun">Full Sun</option>
            <option value="Partial Sun">Partial Sun</option>
            <option value="Shade">Shade</option>
          </select>
        </label>
      </div>

      {/* Soil Type */}
      <div className="property">
        <label>
          Soil Type:
          <select value={soilType} onChange={handleSoilTypeChange}>
            <option value="Sandy">Sandy</option>
            <option value="Clay">Clay</option>
            <option value="Loam">Loam</option>
            {/* Add more options as needed */}
          </select>
        </label>
      </div>
      <button onClick={saveGarden}>Save Garden</button>
    </div>
  );
};

export default GardenProperties;
