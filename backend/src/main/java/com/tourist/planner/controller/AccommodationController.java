package com.tourist.planner.controller;

import com.tourist.planner.model.Accommodation;
import com.tourist.planner.service.AccommodationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class AccommodationController {

    private final AccommodationService accommodationService;

    public AccommodationController(AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }

    @GetMapping
    public ResponseEntity<List<Accommodation>> getAll() {
        return ResponseEntity.ok(accommodationService.getAll());
    }

    @GetMapping("/destination/{destinationSlug}")
    public ResponseEntity<List<Accommodation>> getByDestination(@PathVariable String destinationSlug) {
        return ResponseEntity.ok(accommodationService.getByDestination(destinationSlug));
    }
}
