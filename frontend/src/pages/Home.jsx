import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Navigation as NavIcon } from 'lucide-react';

const Home = () => {
    return (
        <div className="animate-fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '2rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: '500' }}>
                <Sparkles size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                AI-Powered Travel Planning
            </div>

            <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: '800', lineHeight: '1.1' }}>
                Plan Your Next <span style={{ color: 'var(--primary)' }}>Adventure</span> <br />
                With Intelligence
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                Discover the best places nearby or create a detailed roadmap for your dream trip.
                Powered by AI to give you the most efficient and enjoyable experience.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                <Link to="/nearby" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    <MapPin size={20} style={{ marginRight: '0.5rem' }} />
                    Explore Nearby
                </Link>
                <Link to="/roadmap" className="glass-panel" style={{ textDecoration: 'none', color: 'white', padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', fontWeight: '600' }}>
                    <NavIcon size={20} style={{ marginRight: '0.5rem' }} />
                    Plan Roadmap
                </Link>
            </div>

            <div style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {[
                    { title: 'Smart Search', desc: 'Find hidden gems and top-rated spots near any location instantly.' },
                    { title: 'Budget Friendly', desc: 'Optimize your trip according to your budget without compromising fun.' },
                    { title: 'Day-by-Day', desc: 'Get a full itinerary with morning, afternoon, and evening activities.' }
                ].map((feature, i) => (
                    <div key={i} className="glass-panel card" style={{ textAlign: 'left' }}>
                        <h3 style={{ marginBottom: '0.75rem', color: 'white' }}>{feature.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
