package com.tourist.planner.repository;

import com.tourist.planner.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    Optional<Enquiry> findByReferenceNumber(String referenceNumber);
    List<Enquiry> findByEmailOrderByCreatedAtDesc(String email);
    List<Enquiry> findAllByOrderByCreatedAtDesc();
}
