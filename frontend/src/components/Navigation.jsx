import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Route, Home, Compass, UserCheck } from 'lucide-react';

const Navigation = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        { name: 'Nearby Places', path: '/nearby', icon: <Compass size={20} /> },
        { name: 'Travel Roadmap', path: '/roadmap', icon: <Route size={20} /> },
        { name: 'Live Local', path: '/live-local', icon: <UserCheck size={20} /> },
    ];

    return (
        <nav className="glass-panel" style={{
            margin: '1rem auto',
            padding: '1rem 1.5rem',
            maxWidth: '900px',
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            position: 'sticky',
            top: '1rem',
            zIndex: 100,
            flexWrap: 'wrap'
        }}>
            {navLinks.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        fontSize: '0.95rem'
                    }}
                >
                    {link.icon}
                    <span>{link.name}</span>
                </Link>
            ))}
        </nav>
    );
};

export default Navigation;
