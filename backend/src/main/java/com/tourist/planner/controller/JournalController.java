package com.tourist.planner.controller;

import com.tourist.planner.model.JournalPost;
import com.tourist.planner.repository.JournalPostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class JournalController {

    private final JournalPostRepository journalPostRepository;

    public JournalController(JournalPostRepository journalPostRepository) {
        this.journalPostRepository = journalPostRepository;
    }

    @GetMapping
    public ResponseEntity<List<JournalPost>> getAll() {
        return ResponseEntity.ok(journalPostRepository.findAllByOrderByPublishDateDesc());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<JournalPost> getBySlug(@PathVariable String slug) {
        return journalPostRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
