package com.cjaxdevelopment.garden_planner.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "raised_beds")
public class RaisedBed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double length;
    private double width;

    // Many raised beds belong to one garden
    @ManyToOne
    @JoinColumn(name = "garden_id")
    @JsonBackReference
    private Garden garden;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public double getLength() {
        return length;
    }
    public void setLength(double length) {
        this.length = length;
    }
    public double getWidth() {
        return width;
    }
    public void setWidth(double width) {
        this.width = width;
    }
    public Garden getGarden() {
        return garden;
    }
    public void setGarden(Garden garden) {
        this.garden = garden;
    }
}

