import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const GardenApp = (user, onLogout ) => {
  const [gardens, setGardens] = useState([]);
  const [formData, setFormData] = useState({
    userId: 1,
    name: "",
    description: ""
  });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // Fetch gardens on component mount
  useEffect(() => {
    fetchGardens();
  }, []);

  const fetchGardens = async () => {
    try {
      const response = await axios.get("/api/gardens"); 
      setGardens(response.data);
    } catch (error) {
      console.error("Error fetching gardens:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      // Update existing garden
      try {
        await axios.put(`/api/gardens/${editingId}`, formData);
        resetForm();
        fetchGardens();
      } catch (error) {
        console.error("Error updating garden:", error);
      }
    } else {
      // Create a new garden
      try {
        await axios.post("/api/gardens", formData);
        resetForm();
        fetchGardens();
      } catch (error) {
        console.error("Error creating garden:", error);
      }
    }
  };

  const resetForm = () => {
    setEditing(false);
    setEditingId(null);
    setFormData({ userId: 1, name: "", description: "" });
  };

  const handleEdit = (garden, e) => {
    // Prevent card click from firing
    e.stopPropagation();
    setEditing(true);
    setEditingId(garden.gardenId);
    setFormData({
      userId: garden.userId,
      name: garden.name,
      description: garden.description
    });
  };

  const handleDelete = async (id, e) => {
    // Prevent card click from firing
    e.stopPropagation();
    try {
      await axios.delete(`/api/gardens/${id}`);
      fetchGardens();
    } catch (error) {
      console.error("Error deleting garden:", error);
    }
  };

  const navigateToGarden = (gardenId) => {
    // Navigate to the detailed garden page
    navigate(`/gardens/${gardenId}`);
    };

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ padding: "20px" }}>
      <h1>Garden Manager</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Garden Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Garden Description"
          value={formData.description}
          onChange={handleInputChange}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">
          {editing ? "Update Garden" : "Add Garden"}
        </button>
      </form>

      <h2>Garden List</h2>
      {gardens.length === 0 ? (
        <p>No gardens available.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {gardens.map((garden) => (
            <div
              key={garden.gardenId}
              onClick={() => navigateToGarden(garden.gardenId)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "200px",
                cursor: "pointer",
                position: "relative",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <h3>{garden.name}</h3>
              <p>{garden.description}</p>
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  display: "flex",
                  gap: "8px"
                }}
              >
                <button
                  onClick={(e) => handleEdit(garden, e)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                  title="Edit Garden"
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                  onClick={(e) => handleDelete(garden.gardenId, e)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                  title="Delete Garden"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default GardenApp;
