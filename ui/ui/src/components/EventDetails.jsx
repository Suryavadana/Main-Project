import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/EventDetails.css';
import { Link } from 'react-router-dom';

const EventDetails = () => {
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/api/events')
            .then(res => {
                console.log('Fetched data:', res.data);
                setData(res.data);
                setFilteredData(res.data);
                setError(null); // Clear any previous error on successful fetch
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again later.');
            });
    };

    useEffect(() => {
        applyFilters();
    }, [filters]);

    const applyFilters = () => {
        let filtered = [...data];

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

        setFilteredData(filtered);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(event =>
                event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.eventCategory.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, data]);

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

    const formatTime = (timeArray) => {
        try {
            if (!Array.isArray(timeArray) || timeArray.length !== 2) {
                return '';
            }
            const [hours, minutes] = timeArray;
            const time = new Date();
            time.setHours(hours);
            time.setMinutes(minutes);
            return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        } catch (error) {
            console.error('Error formatting time:', error);
            return '';
        }
    };

    const base64ToImageUrl = (base64String, mimeType) => {
        if (!base64String) return '';
        const imageUrl = `data:${mimeType};base64,${base64String}`;
        console.log('Constructed Image URL:', imageUrl);
        return imageUrl;
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
                            <Link to="/login" className='btn btn-outline-primary me-2'>Login</Link>
                            <Link to="/register" className='btn btn-outline-primary'>Register</Link>
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
                        {/* Filter inputs */}
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
                                        <p className='card-text'><strong>Time:</strong> {formatTime(event.eventTime)}</p>
                                        <p className='card-text'><strong>Location:</strong> {event.eventLocation}</p>
                                        <p className='card-text'><strong>Description:</strong> {event.description}</p>
                                        <p className='card-text'><strong>Category:</strong> {event.eventCategory}</p>
                                        <p className='card-text'><strong>Price:</strong> ${event.eventPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-3'>
                        <button className='btn btn-secondary me-2' onClick={clearFilters}>Clear Filters</button>
                        {/* Additional filters components */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
