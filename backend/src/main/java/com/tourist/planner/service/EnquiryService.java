package com.tourist.planner.service;

import com.tourist.planner.dto.EnquiryRequest;
import com.tourist.planner.dto.EnquiryResponse;
import com.tourist.planner.model.Enquiry;
import com.tourist.planner.repository.EnquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;

    public EnquiryService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    public EnquiryResponse createEnquiry(EnquiryRequest req) {
        String refCode = "PMT-" + LocalDateTime.now().getYear() + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        Enquiry enquiry = new Enquiry();
        enquiry.setReferenceNumber(refCode);
        enquiry.setFullName(req.getFullName().trim());
        enquiry.setEmail(req.getEmail().trim().toLowerCase());
        enquiry.setPhone(req.getPhone().trim());
        enquiry.setDestinationPreference(req.getDestinationPreference());
        enquiry.setTravelMonth(req.getTravelMonth());
        enquiry.setDepartureDate(req.getDepartureDate());
        enquiry.setReturnDate(req.getReturnDate());
        enquiry.setTravellersCount(req.getTravellersCount() != null ? req.getTravellersCount() : 2);
        enquiry.setBudget(req.getBudget());
        enquiry.setTravelStyle(req.getTravelStyle());
        enquiry.setAdditionalRequirements(req.getAdditionalRequirements());
        enquiry.setStatus("NEW");
        enquiry.setCreatedAt(LocalDateTime.now());

        Enquiry saved = enquiryRepository.save(enquiry);

        return new EnquiryResponse(
                saved.getReferenceNumber(),
                "Thank you. Your bespoke journey enquiry has been received. Our luxury travel curator will connect with you within 24 hours.",
                saved.getStatus(),
                saved.getCreatedAt()
        );
    }

    @Transactional(readOnly = true)
    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<Enquiry> getEnquiriesByEmail(String email) {
        return enquiryRepository.findByEmailOrderByCreatedAtDesc(email);
    }

    @Transactional(readOnly = true)
    public Optional<Enquiry> getByReferenceNumber(String refNumber) {
        return enquiryRepository.findByReferenceNumber(refNumber);
    }

    public Enquiry updateStatus(Long id, String status) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Enquiry not found with ID: " + id));
        enquiry.setStatus(status);
        return enquiryRepository.save(enquiry);
    }
}
