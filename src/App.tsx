import { useState, type JSX } from 'react'
import './App.css'
// import Login from './pages/Login/Login'
// import EmployeeCreate from './pages/EmployeeCreate/EmployeeCreate'
import Layout from './components/Layout'
import { RouterProvider } from 'react-router'
import  {router} from './router/router'

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
      <RouterProvider router= {router} />
    </>
  )
}

export default App

