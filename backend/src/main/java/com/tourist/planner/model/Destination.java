package com.tourist.planner.model;

import jakarta.persistence.*;

@Entity
@Table(name = "destinations")
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 100)
    private String regionCategory;

    @Column(length = 255)
    private String tagline;

    @Column(length = 500)
    private String heroImage;

    @Column(length = 500)
    private String cardImage;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 150)
    private String bestTimeToVisit;

    private Integer availableTourCount = 0;

    @Column(columnDefinition = "TEXT")
    private String highlights;

    @Column(length = 120)
    private String bestMonths;

    private Integer orderIndex = 0;

    private Boolean active = true;

    public Destination() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRegionCategory() { return regionCategory; }
    public void setRegionCategory(String regionCategory) { this.regionCategory = regionCategory; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getHeroImage() { return heroImage; }
    public void setHeroImage(String heroImage) { this.heroImage = heroImage; }

    public String getCardImage() { return cardImage; }
    public void setCardImage(String cardImage) { this.cardImage = cardImage; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBestTimeToVisit() { return bestTimeToVisit; }
    public void setBestTimeToVisit(String bestTimeToVisit) { this.bestTimeToVisit = bestTimeToVisit; }

    public Integer getAvailableTourCount() { return availableTourCount; }
    public void setAvailableTourCount(Integer availableTourCount) { this.availableTourCount = availableTourCount; }

    public String getHighlights() { return highlights; }
    public void setHighlights(String highlights) { this.highlights = highlights; }

    public String getBestMonths() { return bestMonths; }
    public void setBestMonths(String bestMonths) { this.bestMonths = bestMonths; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
