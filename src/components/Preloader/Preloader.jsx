import React, { useEffect, useState } from 'react';
import './Preloader.css';
const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (
        <div>
            {loading ? (
                <main className="preloader">
                    <div className="colorful"></div>
                </main>
            ) : null}
        </div>
    );
};

export default Preloader;
