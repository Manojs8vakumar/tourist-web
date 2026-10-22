package com.tourist.planner.repository;

import com.tourist.planner.model.JournalPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface JournalPostRepository extends JpaRepository<JournalPost, Long> {
    Optional<JournalPost> findBySlug(String slug);
    List<JournalPost> findAllByOrderByPublishDateDesc();
}
