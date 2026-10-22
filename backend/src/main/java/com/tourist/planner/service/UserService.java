package com.tourist.planner.service;

import com.tourist.planner.dto.AuthRequest;
import com.tourist.planner.dto.AuthResponse;
import com.tourist.planner.dto.RegisterRequest;
import com.tourist.planner.model.Favourite;
import com.tourist.planner.model.Role;
import com.tourist.planner.model.TourPackage;
import com.tourist.planner.model.User;
import com.tourist.planner.repository.FavouriteRepository;
import com.tourist.planner.repository.TourPackageRepository;
import com.tourist.planner.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final TourPackageRepository tourPackageRepository;
    private final FavouriteRepository favouriteRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       TourPackageRepository tourPackageRepository,
                       FavouriteRepository favouriteRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tourPackageRepository = tourPackageRepository;
        this.favouriteRepository = favouriteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername().trim())) {
            throw new IllegalArgumentException("Username is already taken");
        }
        if (userRepository.existsByEmail(req.getEmail().trim().toLowerCase())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = new User();
        user.setUsername(req.getUsername().trim());
        user.setEmail(req.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setFullName(req.getFullName().trim());
        user.setPhone(req.getPhone());
        user.setRole(Role.ROLE_CUSTOMER);
        user.setCreatedAt(LocalDateTime.now());

        User saved = userRepository.save(user);

        String dummyToken = "PMT_AUTH_" + Base64.getEncoder().encodeToString((saved.getUsername() + ":" + saved.getRole()).getBytes());

        return new AuthResponse(
                dummyToken,
                saved.getId(),
                saved.getUsername(),
                saved.getEmail(),
                saved.getFullName(),
                saved.getRole(),
                "Registration successful. Welcome to Plan My Trip Agency."
        );
    }

    public AuthResponse login(AuthRequest req) {
        String identifier = req.getUsername().trim();
        Optional<User> userOpt = userRepository.findByUsername(identifier);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(identifier.toLowerCase());
        }

        if (userOpt.isEmpty() || !passwordEncoder.matches(req.getPassword(), userOpt.get().getPassword())) {
            throw new IllegalArgumentException("Invalid username/email or password");
        }

        User user = userOpt.get();
        String dummyToken = "PMT_AUTH_" + Base64.getEncoder().encodeToString((user.getUsername() + ":" + user.getRole()).getBytes());

        return new AuthResponse(
                dummyToken,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                "Authentication successful"
        );
    }

    @Transactional(readOnly = true)
    public List<TourPackage> getUserFavourites(Long userId) {
        List<Favourite> favs = favouriteRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return favs.stream().map(Favourite::getTourPackage).toList();
    }

    public boolean toggleFavourite(Long userId, Long packageId) {
        Optional<Favourite> existing = favouriteRepository.findByUserIdAndTourPackageId(userId, packageId);
        if (existing.isPresent()) {
            favouriteRepository.delete(existing.get());
            return false;
        } else {
            User user = userRepository.findById(userId).orElseThrow();
            TourPackage tourPackage = tourPackageRepository.findById(packageId).orElseThrow();
            favouriteRepository.save(new Favourite(user, tourPackage));
            return true;
        }
    }
}
