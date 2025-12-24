import React, { useState } from 'react';
import { Search, MapPin, Loader2, DollarSign, Clock } from 'lucide-react';
import { getNearbyPlaces, IS_BACKEND_ACTIVE } from '../services/api';
import { useAlert } from '../components/AlertContext';

const NearbyPlaces = () => {
    const [location, setLocation] = useState('');
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchAttempted, setSearchAttempted] = useState(false);
    const { showAlert } = useAlert();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!location) return;

        if (!IS_BACKEND_ACTIVE) {
            showAlert("Current data is for demonstration purposes. To use live AI, set VITE_IS_BACKEND_ACTIVE=true and provide an API key in the backend.", "warning");
        }

        setLoading(true);
        setError('');
        setSearchAttempted(true);
        try {
            const data = await getNearbyPlaces(location);
            if (data.success) {
                setPlaces(data.places || []);
            } else {
                setError(data.message || 'Failed to fetch places.');
            }
        } catch (err) {
            setError('An error occurred while fetching places.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Discover Nearby <span style={{ color: 'var(--primary)' }}>Gems</span></h2>
                <p style={{ color: 'var(--text-muted)' }}>Enter a location to find interesting places to visit around you.</p>
            </div>

            <form onSubmit={handleSearch} className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto 4rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="E.g., Mumbai, India"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '120px' }}>
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Search size={18} style={{ marginRight: '0.5rem' }} /> Search</>}
                </button>
            </form>

            {error && <div className="glass-panel" style={{ padding: '1rem', color: '#f87171', textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem', border: '1px solid rgba(248, 113, 113, 0.2)' }}>{error}</div>}

            <div className="grid-cards">
                {places.map((place, index) => (
                    <div key={index} className="glass-panel card animate-fade-in" style={{ animationDelay: `${index * 0.1}s`, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', color: 'var(--primary)' }}>
                                <MapPin size={24} />
                            </div>
                            <div style={{ background: 'var(--accent)', color: 'black', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                {place.distance_from_specific_point_km} km away
                            </div>
                        </div>

                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>{place.location_name}</h3>

                        <div className="card-content" style={{ marginTop: 'auto' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                    <DollarSign size={14} style={{ marginRight: '0.25rem' }} />
                                    <span>₹{place.estimated_expense_INR}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                    <Clock size={14} style={{ marginRight: '0.25rem' }} />
                                    <span>{place.time_to_travel_hours} hrs</span>
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                                Explore the beauty and culture of {place.location_name}.
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {searchAttempted && !loading && places.length === 0 && !error && (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No places found for "{location}". Try a different location.</p>
            )}
        </div>
    );
};

export default NearbyPlaces;
