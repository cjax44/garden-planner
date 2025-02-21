package com.cjaxdevelopment.garden_planner.repository;

import com.cjaxdevelopment.garden_planner.model.Garden;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GardenRepository extends JpaRepository<Garden, Long> {
    List<Garden> findByUserId(Long userId);
}
