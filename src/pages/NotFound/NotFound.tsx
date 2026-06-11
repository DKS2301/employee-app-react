import './NotFound.css';

import React from 'react';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <main className="not-found">
            <div className="not-found-content">
                <h1>404</h1>

                <h2>Page Not Found</h2>

                <p>The page you are looking for doesn't exist or has been moved.</p>

                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </main>
    );
}
