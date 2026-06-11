import Layout from '@components/Layout';
import EmployeeCreate from '@pages/EmployeeCreate/EmployeeCreate';
import EmployeeDetails from '@pages/EmployeeDetails/EmployeeDetails';
import EmployeeList from '@pages/EmployeeList/EmployeeList';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import LandingPage from '@pages/LandingPage.tsx/LandingPage';
import Login from '@pages/Login/Login';
import NotFound from '@pages/NotFound/NotFound';
import ProtectedRoute from '@pages/ProtectedRoute';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/home',
        element: <LandingPage />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/employee',
                element: <Layout />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <EmployeeList />,
                    },
                    {
                        path: 'create/:id',
                        element: <EmployeeCreate />,
                    },
                    {
                        path: 'create',
                        element: <EmployeeCreate />,
                    },
                    {
                        path: ':id',
                        element: <EmployeeDetails />,
                    },
                ],
            },
        ],
    },
]);
