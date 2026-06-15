import { Outlet } from 'react-router';

import { useGetCurrentUserQuery } from '@/api-services/auth/login.api';
import Fallback from '@/components/Fallback';

import Login from './Login/Login';

function ProtectedRoute() {
    const { data, isLoading, isError } = useGetCurrentUserQuery();
    if (isLoading) {
        return <Fallback />;
    }
    if (isError) {
        return <Login />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
