package com.example.backend.Controllers;

import com.example.backend.Models.Event;
import com.example.backend.Repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;

    @Autowired
    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // Search events by name containing case-insensitive
    @GetMapping("/search")
    public List<Event> searchEventsByName(@RequestParam(name = "name") String name) {
        return eventRepository.findByEventNameContainingIgnoreCase(name);
    }

   // Get all events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    //Get event by id
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            return ResponseEntity.ok(eventOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create new event
    @PostMapping()
    public ResponseEntity<Event> createEvent(@RequestBody @Valid Event event)
    {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }


    //Update and existing event
    @PutMapping("{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody @Valid Event event)
    {
        //fetch event from database
        Optional<Event> eventOptional = eventRepository.findById(id);  //Retrieves the existing event entity from the database using eventRepository.findById(id)
        // Updates specific fields of the existingEvent entity with values from the event object received in the request body.
        if (eventOptional.isPresent()) {
            Event existingEvent = eventOptional.get();
            existingEvent.setEventName(event.getEventName());
            existingEvent.setEventDate(event.getEventDate());
            existingEvent.setEventTime(event.getEventTime());
            existingEvent.setEventLocation(event.getEventLocation());
            existingEvent.setDescription(event.getDescription());
            Event updatedEvent = eventRepository.save(existingEvent); // Saves the updated Event entity in the database.
            return ResponseEntity.ok(updatedEvent); // Returns the updated Event if the entity exists in the database.
        } else {
            return ResponseEntity.notFound().build(); //if no event with specified id exists in the database, returns a 404 Not Found response.
        }
    }

    //Delete event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            // if event is not found indicates no deletion was performed.
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(id);
        //if the event exists it proceed to delete the event using eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Default mapping for the root path "/"
    @GetMapping("/")
    public ResponseEntity<String> getDefault() {
        return ResponseEntity.ok("Welcome to the Event API!");
    }

// /api/events/search?name=YourEventName
// /api/events
// /api/events/{eventId}
// /api/events (POST with event JSON in the body)
// /api/events/{eventId} (PUT with updated event JSON in the body)
// /api/events/{eventId} (DELETE)

}
