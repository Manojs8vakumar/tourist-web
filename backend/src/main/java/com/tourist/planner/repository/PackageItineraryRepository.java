package com.tourist.planner.repository;

import com.tourist.planner.model.PackageItinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PackageItineraryRepository extends JpaRepository<PackageItinerary, Long> {
    List<PackageItinerary> findByTourPackageIdOrderByDayNumberAsc(Long tourPackageId);
}
