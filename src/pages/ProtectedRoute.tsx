import React from 'react';
import { Outlet, useNavigate } from 'react-router';

import Login from './Login/Login';

function ProtectedRoute() {
    const isAuthenticated = !!localStorage.getItem('access_token');

    if (!isAuthenticated) {
        return <Login />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
