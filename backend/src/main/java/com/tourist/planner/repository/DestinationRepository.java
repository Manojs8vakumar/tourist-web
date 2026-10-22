package com.tourist.planner.repository;

import com.tourist.planner.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    Optional<Destination> findBySlug(String slug);
    List<Destination> findByActiveTrueOrderByOrderIndexAsc();
    List<Destination> findByRegionCategoryAndActiveTrue(String regionCategory);
}
