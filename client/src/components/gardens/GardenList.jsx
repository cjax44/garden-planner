import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

// GardenCard component for individual garden cards
const GardenCard = ({ garden, onEdit, onDelete, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded shadow transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      <h2 className="text-xl font-semibold">{garden.name}</h2>
      <p className="text-gray-600">{garden.description}</p>
      <div className="mt-2 flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(garden);
          }}
          className="mr-2 px-3 py-1 text-sm bg-blue-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(garden.gardenId);
          }}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const GardenList = ({ gardens, onUpdate, onDelete, onAdd, onCardClick }) => {
  const [editingGardenId, setEditingGardenId] = useState(null);
  const [editingFormData, setEditingFormData] = useState({
    name: "",
    description: "",
  });
  const [newGardenData, setNewGardenData] = useState({
    name: "",
    description: "",
    userId: 1, // Adjust as needed
  });

  // Sort gardens alphabetically by name
  const sortedGardens = Array.isArray(gardens)
    ? gardens.slice().sort((a, b) => a.name.localeCompare(b.name))
    : [];

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
    <div className="garden-list-page max-w-3xl mx-auto p-8 space-y-8">
      {/* New Garden Section */}
      <section className="new-garden-section bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add a New Garden</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="name"
            value={newGardenData.name}
            onChange={handleNewChange}
            placeholder="New Garden Name"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="description"
            value={newGardenData.description}
            onChange={handleNewChange}
            placeholder="New Garden Description"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={addNewGarden}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Garden
          </button>
        </div>
      </section>

      {/* Existing Gardens Section */}
      <section className="existing-gardens-section">
        <h2 className="text-2xl font-bold mb-4">Your Gardens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedGardens && sortedGardens.length > 0 ? (
            sortedGardens.map((garden) =>
              editingGardenId === garden.gardenId ? (
                <div
                  key={garden.gardenId}
                  className="bg-white p-4 rounded shadow"
                  onClick={() => {}}
                >
                  <div className="mb-2">
                    <input
                      type="text"
                      name="name"
                      value={editingFormData.name}
                      onChange={handleEditChange}
                      placeholder="Garden Name"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="description"
                      value={editingFormData.description}
                      onChange={handleEditChange}
                      placeholder="Garden Description"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={(e) => saveEditing(garden.gardenId, e)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <GardenCard
                  key={garden.gardenId}
                  garden={garden}
                  onEdit={(garden) => startEditing(garden, { stopPropagation: () => {} })}
                  onDelete={(gardenId) => handleDelete(gardenId, { stopPropagation: () => {} })}
                  onClick={() => onCardClick(garden.gardenId)}
                />
              )
            )
          ) : (
            <p>No gardens available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default GardenList;
