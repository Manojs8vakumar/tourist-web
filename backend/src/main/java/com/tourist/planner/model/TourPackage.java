package com.tourist.planner.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tour_packages")
public class TourPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 120)
    private String slug;

    @Column(length = 20)
    private String packageNumber; // e.g. "01", "02"

    @Column(nullable = false, length = 150)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;

    private Integer durationNights;
    private Integer durationDays;

    @Column(nullable = false)
    private Double startingPriceInr;

    @Column(length = 60)
    private String mood; // Romance, Wildlife, Heritage, Family, Backwaters, Himalaya, Adventure, Beach

    @Column(length = 120)
    private String bestMonths; // e.g. "Oct,Nov,Dec,Jan,Feb,Mar"

    @Column(length = 500)
    private String heroImage;

    @Column(columnDefinition = "TEXT")
    private String highlights;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column(length = 80)
    private String travellerType; // "First-time travellers", "Couples and honeymooners", etc.

    @Column(length = 80)
    private String travelStyle;

    @Column(columnDefinition = "TEXT")
    private String inclusions;

    @Column(columnDefinition = "TEXT")
    private String exclusions;

    private Boolean isSignature = false;

    private Boolean active = true;

    @OneToMany(mappedBy = "tourPackage", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @OrderBy("dayNumber ASC")
    @JsonManagedReference
    private List<PackageItinerary> itineraries = new ArrayList<>();

    public TourPackage() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getPackageNumber() { return packageNumber; }
    public void setPackageNumber(String packageNumber) { this.packageNumber = packageNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Destination getDestination() { return destination; }
    public void setDestination(Destination destination) { this.destination = destination; }

    public Integer getDurationNights() { return durationNights; }
    public void setDurationNights(Integer durationNights) { this.durationNights = durationNights; }

    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }

    public Double getStartingPriceInr() { return startingPriceInr; }
    public void setStartingPriceInr(Double startingPriceInr) { this.startingPriceInr = startingPriceInr; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public String getBestMonths() { return bestMonths; }
    public void setBestMonths(String bestMonths) { this.bestMonths = bestMonths; }

    public String getHeroImage() { return heroImage; }
    public void setHeroImage(String heroImage) { this.heroImage = heroImage; }

    public String getHighlights() { return highlights; }
    public void setHighlights(String highlights) { this.highlights = highlights; }

    public String getOverview() { return overview; }
    public void setOverview(String overview) { this.overview = overview; }

    public String getTravellerType() { return travellerType; }
    public void setTravellerType(String travellerType) { this.travellerType = travellerType; }

    public String getTravelStyle() { return travelStyle; }
    public void setTravelStyle(String travelStyle) { this.travelStyle = travelStyle; }

    public String getInclusions() { return inclusions; }
    public void setInclusions(String inclusions) { this.inclusions = inclusions; }

    public String getExclusions() { return exclusions; }
    public void setExclusions(String exclusions) { this.exclusions = exclusions; }

    public Boolean getIsSignature() { return isSignature; }
    public void setIsSignature(Boolean isSignature) { this.isSignature = isSignature; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public List<PackageItinerary> getItineraries() { return itineraries; }
    public void setItineraries(List<PackageItinerary> itineraries) { this.itineraries = itineraries; }

    public void addItinerary(PackageItinerary itinerary) {
        itineraries.add(itinerary);
        itinerary.setTourPackage(this);
    }
}
