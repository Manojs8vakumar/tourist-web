package com.tourist.planner.service;

import com.tourist.planner.model.Accommodation;
import com.tourist.planner.repository.AccommodationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class AccommodationService {

    private final AccommodationRepository accommodationRepository;

    public AccommodationService(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    @Transactional(readOnly = true)
    public List<Accommodation> getAll() {
        return accommodationRepository.findByActiveTrue();
    }

    @Transactional(readOnly = true)
    public List<Accommodation> getByDestination(String destinationSlug) {
        return accommodationRepository.findByDestinationSlugAndActiveTrue(destinationSlug);
    }

    @Transactional(readOnly = true)
    public List<Accommodation> getByType(String type) {
        return accommodationRepository.findByAccommodationTypeAndActiveTrue(type);
    }

    public Accommodation save(Accommodation accommodation) {
        return accommodationRepository.save(accommodation);
    }

    public void delete(Long id) {
        accommodationRepository.deleteById(id);
    }
}
