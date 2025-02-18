package com.cjaxdevelopment.garden_planner.service;

import com.cjaxdevelopment.garden_planner.model.Garden;
import com.cjaxdevelopment.garden_planner.repository.GardenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GardenService {

    @Autowired
    private GardenRepository gardenRepository;

    // Create or Update a garden
    public Garden saveGarden(Garden garden) {
        return gardenRepository.save(garden);
    }

    // Retrieve a single garden by ID
    public Optional<Garden> getGardenById(Long gardenId) {
        return gardenRepository.findById(gardenId);
    }

    // Retrieve all gardens
    public List<Garden> getAllGardens() {
        return gardenRepository.findAll();
    }

    // Delete a garden
    public void deleteGarden(Long gardenId) {
        gardenRepository.deleteById(gardenId);
    }
}
