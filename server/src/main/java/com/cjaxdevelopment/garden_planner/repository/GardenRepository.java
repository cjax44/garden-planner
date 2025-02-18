package com.cjaxdevelopment.garden_planner.repository;

import com.cjaxdevelopment.garden_planner.model.Garden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GardenRepository extends JpaRepository<Garden, Long> {
    // You can define custom database queries here if needed
}
