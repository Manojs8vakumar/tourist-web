package com.tourist.planner.controller;

import com.tourist.planner.model.Destination;
import com.tourist.planner.service.DestinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping
    public ResponseEntity<List<Destination>> getAll() {
        return ResponseEntity.ok(destinationService.getAllActive());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Destination> getBySlug(@PathVariable String slug) {
        return destinationService.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Destination>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(destinationService.getByRegionCategory(category));
    }
}
