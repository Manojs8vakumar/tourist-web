package com.tourist.planner.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class EnquiryRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+0-9\\s-]{8,20}$", message = "Please provide a valid phone number")
    private String phone;

    private String destinationPreference;
    private String travelMonth;
    private String departureDate;
    private String returnDate;
    private Integer travellersCount = 2;
    private String budget;
    private String travelStyle;
    private String additionalRequirements;

    public EnquiryRequest() {}

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
}
