import { createBrowserRouter } from 'react-router'
import Login from '../pages/Login/Login'
import EmployeeCreate from '../pages/EmployeeCreate/EmployeeCreate'
import LandingPage from '../pages/LandingPage.tsx/LandingPage'
import Layout from '../components/Layout'
import NotFound from '../pages/NotFound/NotFound'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import EmployeeDetails from '../pages/EmployeeDetails/EmployeeDetails'
import ProtectedRoute from '../pages/ProtectedRoute'
import EmployeeList from '../pages/EmployeeList/EmployeeList'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/home",
    element: <LandingPage/>
  },
  {
    path:"*",
    element: <NotFound/>
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children: [
        {
            path:"/employee",
            element: <Layout/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    index: true,
                    element: <EmployeeList/>
                },
                {
                    path: "create/:id",
                    element: <EmployeeCreate/>
                },
                {
                    path: "create",
                    element: <EmployeeCreate/>
                },
                {
                    path:":id",
                    element: <EmployeeDetails/>
                }
            ]
        }
    ]
  },
])