import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const GardenWorkArea = () => {
  const gridLayout = [
    { i: '1', x: 0, y: 0, w: 3, h: 2 },
    { i: '2', x: 3, y: 0, w: 3, h: 2 },
  ];

  return (
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
  );
};

export default GardenWorkArea;
