package com.tourist.planner.controller;

import com.tourist.planner.dto.AuthRequest;
import com.tourist.planner.dto.AuthResponse;
import com.tourist.planner.dto.RegisterRequest;
import com.tourist.planner.model.TourPackage;
import com.tourist.planner.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            AuthResponse response = userService.login(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = userService.register(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/favourites/{userId}")
    public ResponseEntity<List<TourPackage>> getFavourites(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserFavourites(userId));
    }

    @PostMapping("/favourites/{userId}/{packageId}")
    public ResponseEntity<Map<String, Object>> toggleFavourite(
            @PathVariable Long userId,
            @PathVariable Long packageId) {
        boolean isFav = userService.toggleFavourite(userId, packageId);
        return ResponseEntity.ok(Map.of("favourited", isFav));
    }
}
