import React from "react";

const GardenCard = ({ garden, onEdit, onDelete, onClick }) => {
  return (
    <div
      className="garden-card"
      onClick={onClick}
      style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <h2>{garden.name}</h2>
      <p>{garden.description}</p>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
        <button onClick={(e) => { e.stopPropagation(); onEdit(garden); }} style={{ marginRight: "0.5rem" }}>
          Edit
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(garden.gardenId); }} style={{ background: "red", color: "#fff" }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default GardenCard;
