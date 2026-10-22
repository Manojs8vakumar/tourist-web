package com.tourist.planner.controller;

import com.tourist.planner.model.*;
import com.tourist.planner.repository.*;
import com.tourist.planner.service.EnquiryService;
import com.tourist.planner.service.NewsletterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class AdminController {

    private final TourPackageRepository tourPackageRepository;
    private final DestinationRepository destinationRepository;
    private final AccommodationRepository accommodationRepository;
    private final EnquiryRepository enquiryRepository;
    private final EnquiryService enquiryService;
    private final NewsletterService newsletterService;

    public AdminController(TourPackageRepository tourPackageRepository,
                           DestinationRepository destinationRepository,
                           AccommodationRepository accommodationRepository,
                           EnquiryRepository enquiryRepository,
                           EnquiryService enquiryService,
                           NewsletterService newsletterService) {
        this.tourPackageRepository = tourPackageRepository;
        this.destinationRepository = destinationRepository;
        this.accommodationRepository = accommodationRepository;
        this.enquiryRepository = enquiryRepository;
        this.enquiryService = enquiryService;
        this.newsletterService = newsletterService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalPackages", tourPackageRepository.count());
        stats.put("totalDestinations", destinationRepository.count());
        stats.put("totalAccommodations", accommodationRepository.count());
        stats.put("totalEnquiries", enquiryRepository.count());
        stats.put("totalSubscribers", newsletterService.getAllSubscribers().size());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/enquiries")
    public ResponseEntity<List<Enquiry>> getAllEnquiries() {
        return ResponseEntity.ok(enquiryService.getAllEnquiries());
    }

    @PatchMapping("/enquiries/{id}/status")
    public ResponseEntity<Enquiry> updateEnquiryStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.getOrDefault("status", "CONTACTED");
        return ResponseEntity.ok(enquiryService.updateStatus(id, status));
    }

    @GetMapping("/subscribers")
    public ResponseEntity<List<NewsletterSubscriber>> getSubscribers() {
        return ResponseEntity.ok(newsletterService.getAllSubscribers());
    }

    @PostMapping("/packages")
    public ResponseEntity<TourPackage> createPackage(@RequestBody TourPackage tourPackage) {
        return ResponseEntity.ok(tourPackageRepository.save(tourPackage));
    }

    @DeleteMapping("/packages/{id}")
    public ResponseEntity<Map<String, String>> deletePackage(@PathVariable Long id) {
        tourPackageRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Package deleted successfully"));
    }
}
