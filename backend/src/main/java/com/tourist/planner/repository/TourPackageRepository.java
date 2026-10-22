package com.tourist.planner.repository;

import com.tourist.planner.model.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TourPackageRepository extends JpaRepository<TourPackage, Long> {

    Optional<TourPackage> findBySlug(String slug);

    List<TourPackage> findByActiveTrueOrderByPackageNumberAsc();

    List<TourPackage> findByIsSignatureTrueAndActiveTrue();

    List<TourPackage> findByDestinationSlugAndActiveTrue(String destinationSlug);

    List<TourPackage> findByMoodIgnoreCaseAndActiveTrue(String mood);

    List<TourPackage> findByTravellerTypeIgnoreCaseAndActiveTrue(String travellerType);

    @Query("SELECT p FROM TourPackage p WHERE p.active = true " +
           "AND (:mood IS NULL OR LOWER(p.mood) = LOWER(:mood)) " +
           "AND (:destinationSlug IS NULL OR LOWER(p.destination.slug) = LOWER(:destinationSlug)) " +
           "AND (:month IS NULL OR LOWER(p.bestMonths) LIKE LOWER(CONCAT('%', :month, '%'))) " +
           "AND (:search IS NULL OR (LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "    OR LOWER(p.highlights) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "    OR LOWER(p.destination.name) LIKE LOWER(CONCAT('%', :search, '%'))))")
    List<TourPackage> filterPackages(
            @Param("mood") String mood,
            @Param("destinationSlug") String destinationSlug,
            @Param("month") String month,
            @Param("search") String search);
}
