import React from 'react';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-content">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for doesn't exist
          or has been moved.
        </p>

        <button
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </main>
  );
}