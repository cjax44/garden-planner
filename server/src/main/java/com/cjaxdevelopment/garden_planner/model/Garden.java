package com.cjaxdevelopment.garden_planner.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "gardens")
public class Garden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gardenId;

    @Column(nullable = false)
    private Long userId;

    @Column(length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // New fields for additional properties
    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(length = 50)
    private String sunExposure;

    @Column(length = 50)
    private String soilType;

    @OneToMany(mappedBy = "garden", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<RaisedBed> raisedBeds = new ArrayList<>();

    // Getters and setters for existing fields...
    public Long getGardenId() {
        return gardenId;
    }
    public void setGardenId(Long gardenId) {
        this.gardenId = gardenId;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
    public String getSunExposure() {
        return sunExposure;
    }
    public void setSunExposure(String sunExposure) {
        this.sunExposure = sunExposure;
    }
    public String getSoilType() {
        return soilType;
    }
    public void setSoilType(String soilType) {
        this.soilType = soilType;
    }
    public List<RaisedBed> getRaisedBeds() {
        return raisedBeds;
    }
    public void setRaisedBeds(List<RaisedBed> raisedBeds) {
        this.raisedBeds.clear();
        if (raisedBeds != null) {
            for (RaisedBed rb : raisedBeds) {
                rb.setGarden(this);
                this.raisedBeds.add(rb);
            }
        }
    }
}
