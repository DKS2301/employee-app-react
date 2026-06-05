import React from 'react'
import { Outlet } from 'react-router'
import Login from './Login/Login'

function ProtectedRoute() {
    const isAuthenticated = true
    if(!isAuthenticated){
        return <Login/>
    }

    return <Outlet/>
}

export default ProtectedRoute