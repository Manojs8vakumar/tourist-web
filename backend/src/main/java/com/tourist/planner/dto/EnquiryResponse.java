package com.tourist.planner.dto;

import java.time.LocalDateTime;

public class EnquiryResponse {

    private String referenceNumber;
    private String message;
    private String status;
    private LocalDateTime createdAt;

    public EnquiryResponse() {}

    public EnquiryResponse(String referenceNumber, String message, String status, LocalDateTime createdAt) {
        this.referenceNumber = referenceNumber;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
    }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
