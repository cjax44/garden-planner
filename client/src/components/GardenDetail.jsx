import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import Navbar from './Navbar';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../styles/GardenDetail.css';

const GardenDetail = ({ garden, user, onLogout }) => {
  // Provide default values if garden is undefined
  const [dimensions, setDimensions] = useState({
    width: garden?.width || 10,
    height: garden?.height || 10,
  });

  const gridLayout = [
    { i: '1', x: 0, y: 0, w: 3, h: 2 },
    { i: '2', x: 3, y: 0, w: 3, h: 2 },
  ];

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div className="garden-detail">
      <h1>{garden?.name || 'Garden Detail'}</h1>
      <div className="layout-container">
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
        </div>
        <div className="right-panel">
          <h2>Work Area</h2>
          <GridLayout
            className="grid-layout"
            layout={gridLayout}
            cols={12}
            rowHeight={30}
            width={800}
          >
            <div key="1" className="grid-item">
              Item 1
            </div>
            <div key="2" className="grid-item">
              Item 2
            </div>
          </GridLayout>
        </div>
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
