package com.tourist.planner.service;

import com.tourist.planner.model.Destination;
import com.tourist.planner.repository.DestinationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DestinationService {

    private final DestinationRepository destinationRepository;

    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @Transactional(readOnly = true)
    public List<Destination> getAllActive() {
        return destinationRepository.findByActiveTrueOrderByOrderIndexAsc();
    }

    @Transactional(readOnly = true)
    public Optional<Destination> getBySlug(String slug) {
        return destinationRepository.findBySlug(slug);
    }

    @Transactional(readOnly = true)
    public List<Destination> getByRegionCategory(String regionCategory) {
        return destinationRepository.findByRegionCategoryAndActiveTrue(regionCategory);
    }

    public Destination save(Destination destination) {
        return destinationRepository.save(destination);
    }

    public void delete(Long id) {
        destinationRepository.deleteById(id);
    }
}
