import { useState, type JSX } from 'react'
import './App.css'
// import Login from './pages/Login/Login'
// import EmployeeCreate from './pages/EmployeeCreate/EmployeeCreate'
import Layout from './components/Layout'
import Chatbox from './components/Chatbox'
import EmployeeList from './pages/EmployeeList/EmployeeList'
import Login from './pages/Login/Login'
import EmployeeCreate from './pages/EmployeeCreate/EmployeeCreate'
import LandingPage from './pages/LandingPage.tsx/LandingPage'
import {RouterProvider} from "react-router/dom";
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/create",
    element: <EmployeeCreate/>
  },
  {
    path: "/list",
    element: <EmployeeList/>
  },
])
function App() {

  return (
    <>
      {/* <Login/> */}
      {/* <Layout>
        <EmployeeList/>
      </Layout> */}
      {/* <EmployeeCreate /> */}
      {/* <Chatbox/> */}
      {/* <LandingPage/> */}
      <Layout>
        <RouterProvider router= {router} />
      </Layout>
    </>
  )
}

export default App

