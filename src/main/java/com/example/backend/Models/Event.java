package com.example.backend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalTime;
import java.util.Date;

@Entity
public class Event {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Please Enter Event Name.")
    private String eventName;

    @NotNull(message = "Please Enter Event Date.")
    private Date eventDate;

    @NotNull(message = "Please Enter Event Time.")
    private LocalTime eventTime;

    @NotBlank(message = "Event location must not be empty")
    private String eventLocation;

    @NotBlank(message = "Please provide Event Description.")
    @Size(min=5, message = "Description must be at least 5 characters.")
    private String description;

    @Lob // Large Object Byte for storing binary data like images in database.
    @Size(max = 1048576) // 1 MB size limit
    private byte[] eventImage;   // Stores image data in byte array format.
    private String imageMimeType;  // Stores MIME type of image. image/jpeg , png . gif etc.

    public Event(){}

    public Event(String eventName, Date eventDate, LocalTime eventTime, String eventLocation, String description) {
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.eventLocation = eventLocation;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public LocalTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(LocalTime eventTime) {
        this.eventTime = eventTime;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getEventImage() {
        return eventImage;
    }

    public void setEventImage(byte[] eventImage) {
        this.eventImage = eventImage;
        this.imageMimeType = imageMimeType;
    }

    public String getImageMimeType() {
        return imageMimeType;
    }

    public void setImageMimeType(String imageMimeType) {
        this.imageMimeType = imageMimeType;
    }

    // Utility method to determine MIME type
    private String determineMimeType(byte[] imageData) {
        // Implement logic to determine and validate MIME type
        // Example: Apache Tika library or manual detection based on file headers
        return "image/jpeg"; // Example result; implement actual detection
    }

}
