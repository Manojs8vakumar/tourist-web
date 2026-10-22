package com.tourist.planner.controller;

import com.tourist.planner.model.Testimonial;
import com.tourist.planner.repository.TestimonialRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class TestimonialController {

    private final TestimonialRepository testimonialRepository;

    public TestimonialController(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @GetMapping
    public ResponseEntity<List<Testimonial>> getAll() {
        return ResponseEntity.ok(testimonialRepository.findAllByOrderByIdDesc());
    }
}
