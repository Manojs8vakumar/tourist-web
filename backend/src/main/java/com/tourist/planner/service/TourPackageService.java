package com.tourist.planner.service;

import com.tourist.planner.model.TourPackage;
import com.tourist.planner.repository.TourPackageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TourPackageService {

    private final TourPackageRepository tourPackageRepository;

    public TourPackageService(TourPackageRepository tourPackageRepository) {
        this.tourPackageRepository = tourPackageRepository;
    }

    @Transactional(readOnly = true)
    public List<TourPackage> getAllActive() {
        return tourPackageRepository.findByActiveTrueOrderByPackageNumberAsc();
    }

    @Transactional(readOnly = true)
    public List<TourPackage> getSignaturePackages() {
        return tourPackageRepository.findByIsSignatureTrueAndActiveTrue();
    }

    @Transactional(readOnly = true)
    public Optional<TourPackage> getBySlug(String slug) {
        return tourPackageRepository.findBySlug(slug);
    }

    @Transactional(readOnly = true)
    public List<TourPackage> getByDestination(String destinationSlug) {
        return tourPackageRepository.findByDestinationSlugAndActiveTrue(destinationSlug);
    }

    @Transactional(readOnly = true)
    public List<TourPackage> getByTravellerType(String travellerType) {
        return tourPackageRepository.findByTravellerTypeIgnoreCaseAndActiveTrue(travellerType);
    }

    @Transactional(readOnly = true)
    public List<TourPackage> filter(String mood, String destinationSlug, String month, String search) {
        String cleanMood = (mood != null && !mood.trim().isEmpty() && !mood.equalsIgnoreCase("all")) ? mood.trim() : null;
        String cleanDest = (destinationSlug != null && !destinationSlug.trim().isEmpty() && !destinationSlug.equalsIgnoreCase("all")) ? destinationSlug.trim() : null;
        String cleanMonth = (month != null && !month.trim().isEmpty() && !month.equalsIgnoreCase("all")) ? month.trim() : null;
        String cleanSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;

        return tourPackageRepository.filterPackages(cleanMood, cleanDest, cleanMonth, cleanSearch);
    }

    public TourPackage save(TourPackage tourPackage) {
        return tourPackageRepository.save(tourPackage);
    }

    public void delete(Long id) {
        tourPackageRepository.deleteById(id);
    }
}
