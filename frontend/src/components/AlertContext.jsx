import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((message, type = 'info') => {
        setAlert({ message, type });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert(null);
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div className="glass-panel" style={{
                        padding: '2rem',
                        maxWidth: '500px',
                        width: '90%',
                        position: 'relative',
                        textAlign: 'center',
                        border: '1px solid var(--primary)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}>
                        <button
                            onClick={hideAlert}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>
                            {alert.type === 'info' && <Info size={48} />}
                            {alert.type === 'warning' && <AlertTriangle size={48} color="#f59e0b" />}
                            {alert.type === 'success' && <CheckCircle size={48} color="#10b981" />}
                        </div>

                        <h3 style={{ marginBottom: '1rem', color: 'white' }}>Note</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.1rem' }}>
                            {alert.message}
                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={hideAlert}
                            style={{ marginTop: '2rem', width: '100%' }}
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
};
