package com.tourist.planner.model;

import jakarta.persistence.*;

@Entity
@Table(name = "testimonials")
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String authorName;

    @Column(length = 80)
    private String authorLocation;

    @Column(length = 100)
    private String tripType; // "Rajasthan Royal Circuit", "Kerala Backwaters & Hills"

    private Integer rating = 5;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String comment;

    @Column(length = 100)
    private String destinationName;

    @Column(length = 500)
    private String avatarUrl;

    private Boolean isDemo = true;

    public Testimonial() {}

    public Testimonial(String authorName, String authorLocation, String tripType, Integer rating, String comment, String destinationName, String avatarUrl) {
        this.authorName = authorName;
        this.authorLocation = authorLocation;
        this.tripType = tripType;
        this.rating = rating;
        this.comment = comment;
        this.destinationName = destinationName;
        this.avatarUrl = avatarUrl;
        this.isDemo = true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getAuthorLocation() { return authorLocation; }
    public void setAuthorLocation(String authorLocation) { this.authorLocation = authorLocation; }

    public String getTripType() { return tripType; }
    public void setTripType(String tripType) { this.tripType = tripType; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getDestinationName() { return destinationName; }
    public void setDestinationName(String destinationName) { this.destinationName = destinationName; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public Boolean getIsDemo() { return isDemo; }
    public void setIsDemo(Boolean isDemo) { this.isDemo = isDemo; }
}
