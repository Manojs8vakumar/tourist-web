package com.tourist.planner.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enquiries")
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 40)
    private String referenceNumber;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(nullable = false, length = 30)
    private String phone;

    @Column(length = 100)
    private String destinationPreference;

    @Column(length = 50)
    private String travelMonth;

    @Column(length = 50)
    private String departureDate;

    @Column(length = 50)
    private String returnDate;

    private Integer travellersCount;

    @Column(length = 80)
    private String budget;

    @Column(length = 80)
    private String travelStyle;

    @Column(columnDefinition = "TEXT")
    private String additionalRequirements;

    @Column(length = 40)
    private String status = "NEW";

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Enquiry() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDestinationPreference() { return destinationPreference; }
    public void setDestinationPreference(String destinationPreference) { this.destinationPreference = destinationPreference; }

    public String getTravelMonth() { return travelMonth; }
    public void setTravelMonth(String travelMonth) { this.travelMonth = travelMonth; }

    public String getDepartureDate() { return departureDate; }
    public void setDepartureDate(String departureDate) { this.departureDate = departureDate; }

    public String getReturnDate() { return returnDate; }
    public void setReturnDate(String returnDate) { this.returnDate = returnDate; }

    public Integer getTravellersCount() { return travellersCount; }
    public void setTravellersCount(Integer travellersCount) { this.travellersCount = travellersCount; }

    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }

    public String getTravelStyle() { return travelStyle; }
    public void setTravelStyle(String travelStyle) { this.travelStyle = travelStyle; }

    public String getAdditionalRequirements() { return additionalRequirements; }
    public void setAdditionalRequirements(String additionalRequirements) { this.additionalRequirements = additionalRequirements; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
