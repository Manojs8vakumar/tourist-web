package com.tourist.planner.repository;

import com.tourist.planner.model.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    List<Favourite> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Favourite> findByUserIdAndTourPackageId(Long userId, Long tourPackageId);
    void deleteByUserIdAndTourPackageId(Long userId, Long tourPackageId);
}
