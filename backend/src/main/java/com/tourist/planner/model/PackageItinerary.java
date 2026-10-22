package com.tourist.planner.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "package_itineraries")
public class PackageItinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_package_id", nullable = false)
    @JsonBackReference
    private TourPackage tourPackage;

    @Column(nullable = false)
    private Integer dayNumber;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 150)
    private String accommodationName;

    @Column(length = 80)
    private String mealPlan;

    @Column(length = 255)
    private String activityHighlights;

    public PackageItinerary() {}

    public PackageItinerary(Integer dayNumber, String title, String description, String accommodationName, String mealPlan, String activityHighlights) {
        this.dayNumber = dayNumber;
        this.title = title;
        this.description = description;
        this.accommodationName = accommodationName;
        this.mealPlan = mealPlan;
        this.activityHighlights = activityHighlights;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public TourPackage getTourPackage() { return tourPackage; }
    public void setTourPackage(TourPackage tourPackage) { this.tourPackage = tourPackage; }

    public Integer getDayNumber() { return dayNumber; }
    public void setDayNumber(Integer dayNumber) { this.dayNumber = dayNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAccommodationName() { return accommodationName; }
    public void setAccommodationName(String accommodationName) { this.accommodationName = accommodationName; }

    public String getMealPlan() { return mealPlan; }
    public void setMealPlan(String mealPlan) { this.mealPlan = mealPlan; }

    public String getActivityHighlights() { return activityHighlights; }
    public void setActivityHighlights(String activityHighlights) { this.activityHighlights = activityHighlights; }
}
