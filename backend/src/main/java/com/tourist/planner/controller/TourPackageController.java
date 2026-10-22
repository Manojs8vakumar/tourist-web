package com.tourist.planner.controller;

import com.tourist.planner.model.TourPackage;
import com.tourist.planner.service.TourPackageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class TourPackageController {

    private final TourPackageService tourPackageService;

    public TourPackageController(TourPackageService tourPackageService) {
        this.tourPackageService = tourPackageService;
    }

    @GetMapping
    public ResponseEntity<List<TourPackage>> getAll(
            @RequestParam(required = false) String mood,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String month,
            @RequestParam(required = false) String search) {

        if (mood != null || destination != null || month != null || search != null) {
            return ResponseEntity.ok(tourPackageService.filter(mood, destination, month, search));
        }
        return ResponseEntity.ok(tourPackageService.getAllActive());
    }

    @GetMapping("/signatures")
    public ResponseEntity<List<TourPackage>> getSignatures() {
        return ResponseEntity.ok(tourPackageService.getSignaturePackages());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<TourPackage> getBySlug(@PathVariable String slug) {
        return tourPackageService.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/destination/{destinationSlug}")
    public ResponseEntity<List<TourPackage>> getByDestination(@PathVariable String destinationSlug) {
        return ResponseEntity.ok(tourPackageService.getByDestination(destinationSlug));
    }

    @GetMapping("/traveller-type/{type}")
    public ResponseEntity<List<TourPackage>> getByTravellerType(@PathVariable String type) {
        return ResponseEntity.ok(tourPackageService.getByTravellerType(type));
    }
}
