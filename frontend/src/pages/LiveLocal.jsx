import React, { useState } from 'react';
import { Search, MapPin, Loader2, Utensils, ShoppingBag, Truck, EyeOff, Users, Clock, Info } from 'lucide-react';
import { liveLikeLocal, IS_BACKEND_ACTIVE } from '../services/api';
import { useAlert } from '../components/AlertContext';

const LiveLocal = () => {
    const { showAlert } = useAlert();
    const [location, setLocation] = useState('');
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!location) return;

        if (!IS_BACKEND_ACTIVE) {
            showAlert("Current data is for demonstration purposes. To use live AI, set VITE_IS_BACKEND_ACTIVE=true and provide an API key in the backend.", "warning");
        }

        setLoading(true);
        setError('');
        setGuide(null);
        try {
            const data = await liveLikeLocal(location);
            if (data.success) {
                setGuide(data.localGuide);
            } else {
                setError(data.message || 'Failed to fetch local guide.');
            }
        } catch (err) {
            setError('An error occurred while fetching the local guide.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const Section = ({ title, icon: Icon, items, type }) => {
        if (!items || items.length === 0) return null;
        return (
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>
                    <Icon size={22} />
                    {title}
                </h3>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {items.map((item, idx) => (
                        <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', border: '1px solid var(--glass-border)' }}>
                            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>{item.name || item.type || item.time}</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{item.description || item.activity}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Live Like a <span style={{ color: 'var(--primary)' }}>Local</span></h2>
                <p style={{ color: 'var(--text-muted)' }}>Get insider tips on how to truly experience a place beyond the tourist spots.</p>
            </div>

            <form onSubmit={handleSearch} className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto 4rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="E.g., Tokyo, Japan"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '120px' }}>
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Search size={18} style={{ marginRight: '0.5rem' }} /> Explore</>}
                </button>
            </form>

            {error && <div className="glass-panel" style={{ padding: '1rem', color: '#f87171', textAlign: 'center', maxWidth: '600px', margin: '2rem auto', border: '1px solid rgba(248, 113, 113, 0.2)', fontWeight: 'bold' }}>{error}</div>}

            {guide && (
                <div className="guide-container animate-fade-in">
                    <Section title="Local Foods & Drinks" icon={Utensils} items={guide.local_foods_drinks} />
                    <Section title="Traditional Markets" icon={ShoppingBag} items={guide.local_markets} />
                    <Section title="Local Transportation" icon={Truck} items={guide.local_transportation} />
                    <Section title="Hidden Spots" icon={EyeOff} items={guide.hidden_spots} />
                    <Section title="Customs & Habits" icon={Users} items={guide.local_customs} />
                    <Section title="Daily Routines" icon={Clock} items={guide.daily_routines} />
                    <Section title="Cultural Practices" icon={Info} items={guide.cultural_practices} />
                </div>
            )}

            {loading && (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <Loader2 className="animate-spin" size={48} style={{ color: 'var(--primary)' }} />
                    <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Gathering local insights...</p>
                </div>
            )}
        </div>
    );
};

export default LiveLocal;
