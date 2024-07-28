import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventForm = () => {
    const [eventDetails, setEventDetails] = useState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        description: '',
        eventCategory: '',
        eventPrice: '',
        eventImage: null // File input for image upload
    });

    const [error, setError] = useState(null); // To handle any errors
    const navigate = useNavigate(); // Hook for navigation

    // Handle text and file input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setEventDetails(prevDetails => ({
            ...prevDetails,
            eventImage: e.target.files[0]
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare form data for submission
        const formData = new FormData();
        for (const key in eventDetails) {
            if (eventDetails[key]) { // Only append non-null values
                formData.append(key, eventDetails[key]);
            }
        }

        // Submit form data to the server
        axios.post('http://localhost:8080/api/events', formData)
            .then(response => {
                navigate('/events'); // Redirect to Events page upon success
            })
            .catch(err => {
                console.error('Error creating event:', err);
                setError('Error creating event. Please try again later.');
            });
    };

    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <h1 className='text-primary'>Create New Event</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Event Name</label>
                            <input
                                type='text'
                                name='eventName'
                                value={eventDetails.eventName}
                                onChange={handleChange}
                                className='form-control'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Event Date</label>
                            <input
                                type='date'
                                name='eventDate'
                                value={eventDetails.eventDate}
                                onChange={handleChange}
                                className='form-control'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Event Time</label>
                            <input
                                type='time'
                                name='eventTime'
                                value={eventDetails.eventTime}
                                onChange={handleChange}
                                className='form-control'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Event Location</label>
                            <input
                                type='text'
                                name='eventLocation'
                                value={eventDetails.eventLocation}
                                onChange={handleChange}
                                className='form-control'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea
                                name='description'
                                value={eventDetails.description}
                                onChange={handleChange}
                                className='form-control'
                                rows='3'
                                required
                            ></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Category</label>
                            <input
                                type='text'
                                name='eventCategory'
                                value={eventDetails.eventCategory}
                                onChange={handleChange}
                                className='form-control'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Price ($)</label>
                            <input
                                type='number'
                                name='eventPrice'
                                value={eventDetails.eventPrice}
                                onChange={handleChange}
                                className='form-control'
                                min='0'
                                step='0.01'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Event Image</label>
                            <input
                                type='file'
                                onChange={handleFileChange}
                                className='form-control'
                                accept='image/*'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Create Event</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventForm;
