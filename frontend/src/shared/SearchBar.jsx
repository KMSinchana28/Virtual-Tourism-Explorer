
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './search-bar.css';
import { FaMapMarkerAlt, FaRulerHorizontal, FaUsers, FaSearch } from 'react-icons/fa';
import { BASE_URL } from '../utils/config';

const SearchForm = () => {
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [maxPeople, setMaxPeople] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!destination.trim() || !distance || !maxPeople) {
      alert('Please fill in all search fields.');
      return;
    }

    if (Number(distance) <= 0 || Number(maxPeople) <= 0) {
      alert('Distance and number of people must be greater than zero.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?city=${encodeURIComponent(destination.trim())}&distance=${encodeURIComponent(distance)}&maxGroupSize=${encodeURIComponent(maxPeople)}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to search tours.');
      }

      navigate('/tours/search', {
        state: result.data || []
      });
    } catch (error) {
      alert(error.message || 'Failed to fetch tours.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <div className="input-icon"><FaMapMarkerAlt /></div>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you going?"
            className="search-input"
          />
        </div>

        <div className="input-group">
          <div className="input-icon"><FaRulerHorizontal /></div>
          <input
            type="number"
            min="1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Distance km"
            className="search-input"
          />
        </div>

        <div className="input-group">
          <div className="input-icon"><FaUsers /></div>
          <input
            type="number"
            min="1"
            value={maxPeople}
            onChange={(e) => setMaxPeople(e.target.value)}
            placeholder="Max People"
            className="search-input"
          />
        </div>

        <button type="submit" className="search-button" disabled={loading}>
          <FaSearch />
          <span>{loading ? 'Searching...' : 'Search'}</span>
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
