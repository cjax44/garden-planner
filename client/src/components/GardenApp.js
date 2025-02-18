import React, { useState, useEffect } from "react";
import axios from "axios";

const GardenApp = () => {
  const [gardens, setGardens] = useState([]);
  const [formData, setFormData] = useState({
    userId: 1, // Adjust as needed
    name: "",
    description: ""
  });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch gardens from the backend when the component mounts
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
        await axios.put(`http://localhost:8080/api/gardens/${editingId}`, formData);
        resetForm();
        fetchGardens();
      } catch (error) {
        console.error("Error updating garden:", error);
      }
    } else {
      // Create a new garden
      try {
        await axios.post("http://localhost:8080/api/gardens", formData);
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
    setFormData({
      userId: 1,
      name: "",
      description: ""
    });
  };

  const handleEdit = (garden) => {
    setEditing(true);
    setEditingId(garden.gardenId);
    setFormData({
      userId: garden.userId,
      name: garden.name,
      description: garden.description
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/gardens/${id}`);
      fetchGardens();
    } catch (error) {
      console.error("Error deleting garden:", error);
    }
  };

  return (
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
        <button type="submit">{editing ? "Update Garden" : "Add Garden"}</button>
      </form>

      <h2>Garden List</h2>
      {gardens.length === 0 ? (
        <p>No gardens available.</p>
      ) : (
        <ul>
          {gardens.map((garden) => (
            <li key={garden.gardenId} style={{ marginBottom: "10px" }}>
              <strong>{garden.name}</strong>: {garden.description}{" "}
              <button onClick={() => handleEdit(garden)} style={{ marginLeft: "10px" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(garden.gardenId)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GardenApp;
