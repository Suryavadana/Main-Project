import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Events.css';
import { useAuth } from '../auth/AuthContext'; // Import useAuth to manage authentication

const Events = () => {
    const [data, setData] = useState([]); // State to store fetched event data
    const [filteredData, setFilteredData] = useState([]); // State to store filtered event data
    const [error, setError] = useState(null); // State to handle errors during data fetching
    const [searchTerm, setSearchTerm] = useState(''); // State to manage search term for event filtering
    const [filters, setFilters] = useState({ // State to manage various filters
        category: '',
        startDate: '',
        endDate: '',
        location: '',
        minPrice: '',
        maxPrice: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate hook for navigation
    const location = useLocation(); // Hook to access location object for navigation state
    const { logout } = useAuth(); // Access logout function from AuthContext

    // Fetch data from API on initial component mount or when navigation occurs
    useEffect(() => {
        fetchData();
    }, [location.key]); // Depend on location.key to refetch data when navigating back from create-event

    // Function to fetch event data from API
    const fetchData = () => {
        axios.get('http://localhost:8080/api/events')
            .then(res => {
                setData(res.data); // Set fetched data to state
                setFilteredData(res.data); // Initially set filteredData to all data
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again later.'); // Handle fetch error
            });
    };

    // Effect to apply filters whenever filters state changes
    useEffect(() => {
        applyFilters();
    }, [filters]);

    // Function to apply filters to event data
    const applyFilters = () => {
        let filtered = [...data]; // Create a copy of original data array

        // Apply filters based on the filter state
        if (filters.category) {
            filtered = filtered.filter(event => event.eventCategory === filters.category);
        }
        if (filters.startDate && filters.endDate) {
            filtered = filtered.filter(event =>
                new Date(event.eventDate) >= new Date(filters.startDate) &&
                new Date(event.eventDate) <= new Date(filters.endDate)
            );
        }
        if (filters.location) {
            filtered = filtered.filter(event => event.eventLocation.toLowerCase().includes(filters.location.toLowerCase()));
        }
        if (filters.minPrice && filters.maxPrice) {
            filtered = filtered.filter(event =>
                event.eventPrice >= parseFloat(filters.minPrice) &&
                event.eventPrice <= parseFloat(filters.maxPrice)
            );
        }

        setFilteredData(filtered); // Update filteredData state with filtered array
    };

    // Handler function for search input change
    const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Update search term state
    };

    // Effect to filter data based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredData(data); // Reset filteredData if search term is empty
        } else {
            const filtered = data.filter(event =>
                event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventCategory.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered); // Update filteredData based on search term
        }
    }, [searchTerm, data]);

    // Function to clear all filters and search term
    const clearFilters = () => {
        setFilters({
            category: '',
            startDate: '',
            endDate: '',
            location: '',
            minPrice: '',
            maxPrice: ''
        });
        setSearchTerm(''); // Reset search term state
    };

    // Function to handle create event button click
    const handleCreateEvent = () => {
        navigate('/create-event'); // Navigate to EventForm
    };

    // Function to handle logout and redirect to EventDetails
    const handleLogout = () => {
        logout(); // Perform logout logic
        navigate('/'); // Redirect to EventDetails after logout
    };

    // Function to fetch and update approval status of an event
    const fetchAndUpdateApprovalStatus = (eventId) => {
        // Implementation of this function is missing in your code, so please add it as needed.
        // Example: axios.post(`http://localhost:8080/api/events/${eventId}/approve`)
        console.log(`Update approval status for event ID: ${eventId}`);
    };

    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {!data.length && !error && <div className="alert alert-info">Loading...</div>}

                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h1 className='text-primary'>Event Finder</h1>
                        <div>
                            <button className='btn btn-outline-primary me-2' onClick={handleCreateEvent}>Create Event</button>
                            <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
                        </div>
                    </div>

                    {/* Filtering UI */}
                    <div className='row mb-3'>
                        <div className='col-md-4'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Search...'
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className='col-md-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Category'
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            />
                        </div>
                        <div className='col-md-2'>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Start Date'
                                value={filters.startDate}
                                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                            />
                        </div>
                        <div className='col-md-2'>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='End Date'
                                value={filters.endDate}
                                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                            />
                        </div>
                        <div className='col-md-2'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Location'
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            />
                        </div>
                        <div className='col-md-2'>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Min Price'
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                            />
                        </div>
                        <div className='col-md-2'>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Max Price'
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className='row row-cols-1 row-cols-md-2 g-4'>
                        {filteredData.map((event, index) => (
                            <div key={index} className='col'>
                                <div className='card'>
                                    <img
                                        src={`data:${event.imageMimeType};base64,${event.eventImage}`}
                                        className='card-img-top'
                                        alt={event.eventName}
                                    />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{event.eventName}</h5>
                                        <p className='card-text'><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
                                        <p className='card-text'><strong>Time:</strong> {event.eventTime}</p>
                                        <p className='card-text'><strong>Location:</strong> {event.eventLocation}</p>
                                        <p className='card-text'><strong>Description:</strong> {event.description}</p>
                                        <p className='card-text'><strong>Category:</strong> {event.eventCategory}</p>
                                        <p className='card-text'><strong>Price:</strong> ${event.eventPrice.toFixed(2)}</p>
                                        <p className='card-text'><strong>Approval Status:</strong> {event.approvalStatus}</p>
                                        <button className='btn btn-primary' onClick={() => fetchAndUpdateApprovalStatus(event.id)}>Approve Event</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-3'>
                        <button className='btn btn-secondary me-2' onClick={clearFilters}>Clear Filters</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
