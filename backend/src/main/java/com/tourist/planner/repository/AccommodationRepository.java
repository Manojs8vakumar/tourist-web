package com.tourist.planner.repository;

import com.tourist.planner.model.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByActiveTrue();
    List<Accommodation> findByDestinationSlugAndActiveTrue(String destinationSlug);
    List<Accommodation> findByAccommodationTypeAndActiveTrue(String accommodationType);
}
