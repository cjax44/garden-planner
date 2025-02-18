import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/GardenList.css";

const GardenList = ({ gardens, onUpdate, onDelete, onAdd, onCardClick }) => {
  const [editingGardenId, setEditingGardenId] = useState(null);
  const [editingFormData, setEditingFormData] = useState({
    name: "",
    description: "",
  });
  const [newGardenData, setNewGardenData] = useState({
    name: "",
    description: "",
    userId: 1, // Update as needed or pass as a prop
  });

  // Sort gardens in descending order by gardenId
  const sortedGardens = gardens.slice().sort((a, b) => b.gardenId - a.gardenId);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewGardenData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (garden, e) => {
    e.stopPropagation();
    setEditingGardenId(garden.gardenId);
    setEditingFormData({
      name: garden.name,
      description: garden.description,
    });
  };

  const cancelEditing = (e) => {
    e.stopPropagation();
    setEditingGardenId(null);
    setEditingFormData({ name: "", description: "" });
  };

  const saveEditing = (gardenId, e) => {
    e.stopPropagation();
    onUpdate(gardenId, editingFormData);
    setEditingGardenId(null);
    setEditingFormData({ name: "", description: "" });
  };

  const handleDelete = (gardenId, e) => {
    e.stopPropagation();
    onDelete(gardenId);
  };

  const addNewGarden = (e) => {
    e.stopPropagation();
    onAdd(newGardenData);
    setNewGardenData({ name: "", description: "", userId: 1 });
  };

  return (
    <div className="garden-list">
      {/* "Add New Garden" row at the top */}
      <div className="garden-card add-new-card">
        <div className="garden-column garden-info">
          <input
            type="text"
            name="name"
            value={newGardenData.name}
            onChange={handleNewChange}
            placeholder="New Garden Name"
          />
        </div>
        <div className="garden-column garden-description">
          <input
            type="text"
            name="description"
            value={newGardenData.description}
            onChange={handleNewChange}
            placeholder="New Garden Description"
          />
        </div>
        <div className="garden-column garden-actions">
          <button onClick={addNewGarden}>Add Garden</button>
        </div>
      </div>

      {/* Render sorted gardens */}
      {sortedGardens && sortedGardens.length > 0 ? (
        sortedGardens.map((garden) => (
          <div
            key={garden.gardenId}
            className="garden-card"
            onClick={() => {
              // Only navigate if not editing this card
              if (editingGardenId !== garden.gardenId) {
                onCardClick(garden.gardenId);
              }
            }}
          >
            {editingGardenId === garden.gardenId ? (
              <>
                <div className="garden-column garden-info">
                  <input
                    type="text"
                    name="name"
                    value={editingFormData.name}
                    onChange={handleEditChange}
                    placeholder="Garden Name"
                  />
                </div>
                <div className="garden-column garden-description">
                  <input
                    type="text"
                    name="description"
                    value={editingFormData.description}
                    onChange={handleEditChange}
                    placeholder="Garden Description"
                  />
                </div>
                <div className="garden-column garden-actions">
                  <button onClick={(e) => saveEditing(garden.gardenId, e)}>
                    Save
                  </button>
                  <button onClick={cancelEditing}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="garden-column garden-info">
                  <h2>{garden.name}</h2>
                </div>
                <div className="garden-column garden-description">
                  <p>{garden.description}</p>
                </div>
                <div
                  className="garden-column garden-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="action-icon"
                    onClick={(e) => startEditing(garden, e)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="action-icon"
                    onClick={(e) => handleDelete(garden.gardenId, e)}
                  />
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No gardens available</p>
      )}
    </div>
  );
};

export default GardenList;
