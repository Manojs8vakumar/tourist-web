package com.tourist.planner.controller;

import com.tourist.planner.dto.NewsletterRequest;
import com.tourist.planner.service.NewsletterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> subscribe(@Valid @RequestBody NewsletterRequest request) {
        String msg = newsletterService.subscribe(request);
        return ResponseEntity.ok(Map.of("message", msg));
    }
}
