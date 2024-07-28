import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Events.css';
import { useAuth } from '../auth/AuthContext';

const Events = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        startDate: '',
        endDate: '',
        location: '',
        minPrice: '',
        maxPrice: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    // Fetch data when component mounts or location changes
    useEffect(() => {
        fetchData();
    }, [location.key]);

    const fetchData = () => {
        axios.get('http://localhost:8080/api/events')
            .then(res => {
                setData(res.data);
                setFilteredData(res.data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again later.');
            });
    };

    // Apply filters and search term when any of them changes
    useEffect(() => {
        applyFiltersAndSearch();
    }, [filters, searchTerm, data]);

    const applyFiltersAndSearch = () => {
        let filtered = [...data];

        // Apply filters
        if (filters.category) {
            filtered = filtered.filter(event => 
                event.eventCategory.toLowerCase() === filters.category.toLowerCase()
            );
        }

        if (filters.startDate && filters.endDate) {
            filtered = filtered.filter(event =>
                new Date(event.eventDate) >= new Date(filters.startDate) &&
                new Date(event.eventDate) <= new Date(filters.endDate)
            );
        }

        if (filters.location) {
            filtered = filtered.filter(event => 
                event.eventLocation.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.minPrice && filters.maxPrice) {
            filtered = filtered.filter(event =>
                event.eventPrice >= parseFloat(filters.minPrice) &&
                event.eventPrice <= parseFloat(filters.maxPrice)
            );
        }

        // Apply search term
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(event =>
                event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventCategory.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            startDate: '',
            endDate: '',
            location: '',
            minPrice: '',
            maxPrice: ''
        });
        setSearchTerm('');
    };

    const fetchAndUpdateApprovalStatus = (eventId) => {
        console.log(`Update approval status for event ID: ${eventId}`);
    };

    const base64ToImageUrl = (base64String, mimeType) => {
        if (!base64String) return '';
        return `data:${mimeType};base64,${base64String}`;
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
                            <button className='btn btn-outline-primary me-2' onClick={() => navigate('/create-event')}>Create Event</button>
                            <button className='btn btn-outline-danger' onClick={() => { logout(); navigate('/'); }}>Logout</button>
                        </div>
                    </div>

                    <input
                        type='text'
                        className='form-control mb-3'
                        placeholder='Search events...'
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    <div className='row mb-3'>
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
                                        src={base64ToImageUrl(event.eventImage, event.imageMimeType)}
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
                        <button className='btn btn-secondary' onClick={clearFilters}>Clear Filters</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
