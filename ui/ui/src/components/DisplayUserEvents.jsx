import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisplayUserEvents = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        // Handle error fetching event data
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Event Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{event.eventName}</h5>
          <p className="card-text"><strong>Date:</strong> {event.eventDate}</p>
          <p className="card-text"><strong>Time:</strong> {event.eventTime}</p>
          <p className="card-text"><strong>Location:</strong> {event.eventLocation}</p>
          <p className="card-text"><strong>Description:</strong> {event.description}</p>
          <p className="card-text"><strong>Category:</strong> {event.eventCategory}</p>
          <p className="card-text"><strong>Price:</strong> {event.eventPrice}</p>
          {event.image && (
            <div>
              <strong>Event Image:</strong>
              <img src={`data:image/jpeg;base64,${event.image}`} alt="Event" className="img-fluid" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayUserEvents;
