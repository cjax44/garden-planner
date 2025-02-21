package com.cjaxdevelopment.garden_planner.controller;

import com.cjaxdevelopment.garden_planner.model.Garden;
import com.cjaxdevelopment.garden_planner.service.GardenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gardens")
@CrossOrigin(origins = "http://localhost:3000")
public class GardenController {

    @Autowired
    private GardenService gardenService;

    @PostMapping
    public Garden createGarden(@RequestBody Garden garden) {
        return gardenService.saveGarden(garden);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Garden> getGardenById(@PathVariable Long id) {
        return gardenService.getGardenById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Garden> getAllGardens(@RequestParam Long userId) {
        return gardenService.getGardensByUserId(userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Garden> updateGarden(@PathVariable Long id, @RequestBody Garden gardenDetails) {
        return gardenService.getGardenById(id).map(garden -> {
            garden.setName(gardenDetails.getName());
            garden.setDescription(gardenDetails.getDescription());
            // Set the new properties
            garden.setNotes(gardenDetails.getNotes());
            garden.setSunExposure(gardenDetails.getSunExposure());
            garden.setSoilType(gardenDetails.getSoilType());
            garden.setRaisedBeds(gardenDetails.getRaisedBeds());
            
            Garden updatedGarden = gardenService.saveGarden(garden);
            return ResponseEntity.ok(updatedGarden);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGarden(@PathVariable Long id) {
        return gardenService.getGardenById(id).map(garden -> {
            gardenService.deleteGarden(garden.getGardenId());
            return ResponseEntity.ok().<Void>build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
    }

