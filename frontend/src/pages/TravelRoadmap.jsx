import React, { useState } from 'react';
import { Route as RouteIcon, Send, Loader2, Calendar, DollarSign, MapPin, Truck, Home, Activity, Clock } from 'lucide-react';
import { getTravelRoadmap, IS_BACKEND_ACTIVE } from '../services/api';
import { useAlert } from '../components/AlertContext';

const TravelRoadmap = () => {
    const { showAlert } = useAlert();
    const [formData, setFormData] = useState({
        start: '',
        destination: '',
        budget: '',
        days: ''
    });
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { start, destination, budget, days } = formData;
        if (!start || !destination || !budget || !days) return;

        if (!IS_BACKEND_ACTIVE) {
            showAlert("Current data is for demonstration purposes. To use live AI, set VITE_IS_BACKEND_ACTIVE=true and provide an API key in the backend.", "warning");
        }

        setLoading(true);
        setError('');
        setRoadmap(null);
        try {
            const data = await getTravelRoadmap(start, destination, budget, days);
            if (data.success) {
                setRoadmap(data.roadmap);
            } else {
                setError(data.message || 'Failed to generate roadmap.');
            }
        } catch (err) {
            setError('An error occurred while generating the roadmap.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Your Custom <span style={{ color: 'var(--primary)' }}>Roadmap</span></h2>
                <p style={{ color: 'var(--text-muted)' }}>Generate a professional, day-by-day travel itinerary based on your preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: roadmap ? '380px 1fr' : '1fr', gap: '2rem', maxWidth: roadmap ? '1300px' : '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem', height: 'fit-content', position: roadmap ? 'sticky' : 'relative', top: '5rem' }}>
                    <div className="input-group">
                        <label className="input-label"><MapPin size={14} style={{ marginRight: '0.1rem' }} /> Start Location</label>
                        <input name="start" type="text" className="input-field" placeholder="E.g., Mumbai" value={formData.start} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label className="input-label"><MapPin size={14} style={{ marginRight: '0.1rem' }} /> Destination</label>
                        <input name="destination" type="text" className="input-field" placeholder="E.g., Goa" value={formData.destination} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label className="input-label"><DollarSign size={14} style={{ marginRight: '0.1rem' }} /> Budget (₹)</label>
                        <input name="budget" type="number" className="input-field" placeholder="E.g., 20000" value={formData.budget} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label className="input-label"><Calendar size={14} style={{ marginRight: '0.1rem' }} /> Duration (Days)</label>
                        <input name="days" type="number" className="input-field" placeholder="E.g., 4" value={formData.days} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} style={{ marginRight: '0.5rem' }} /> Generate Roadmap</>}
                    </button>
                </form>

                {roadmap && (
                    <div className="roadmap-results">
                        {roadmap.map((day, idx) => (
                            <div key={idx} className="glass-panel animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem', animationDelay: `${idx * 0.1}s` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>
                                        Day {day.day_number}
                                    </h3>
                                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '1rem', fontWeight: 'bold' }}>
                                        Est. Expense: ₹{day.total_estimated_expense}
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: '600' }}>
                                            <Truck size={18} /> Transport
                                        </div>
                                        <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{day.mode_of_transportation}</p>
                                    </div>
                                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: '600' }}>
                                            <Home size={18} /> Stay
                                        </div>
                                        <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{day.accommodation}</p>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: '600' }}>
                                        <Activity size={18} /> Planned Activities
                                    </div>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {day.activities.map((act, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', borderLeft: '3px solid var(--primary)' }}>
                                                <span style={{ color: 'white' }}>{act.activity}</span>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}>
                                                    <Clock size={14} style={{ marginRight: '0.4rem' }} /> {act.time}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && <div className="glass-panel" style={{ padding: '1rem', color: '#f87171', textAlign: 'center', maxWidth: '600px', margin: '2rem auto', border: '1px solid rgba(248, 113, 113, 0.2)' }}>{error}</div>}
        </div>
    );
};

export default TravelRoadmap;
