package com.tourist.planner.controller;

import com.tourist.planner.dto.EnquiryRequest;
import com.tourist.planner.dto.EnquiryResponse;
import com.tourist.planner.model.Enquiry;
import com.tourist.planner.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<EnquiryResponse> submitEnquiry(@Valid @RequestBody EnquiryRequest request) {
        EnquiryResponse response = enquiryService.createEnquiry(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/ref/{refNumber}")
    public ResponseEntity<Enquiry> getByRef(@PathVariable String refNumber) {
        return enquiryService.getByReferenceNumber(refNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Enquiry>> getByUserEmail(@PathVariable String email) {
        return ResponseEntity.ok(enquiryService.getEnquiriesByEmail(email));
    }
}
