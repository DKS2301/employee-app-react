import { useState } from 'react'
import './App.css'
// import Login from './pages/Login/Login'
// import EmployeeCreate from './pages/EmployeeCreate/EmployeeCreate'
import Layout from './components/Layout'
import Chatbox from './components/Chatbox'
import EmployeeList from './pages/EmployeeList/EmployeeList'

function App() {

  return (
    <>
      {/* <Login/> */}
      <Layout>
        {/* <EmployeeCreate/> */}
        <EmployeeList/>
      </Layout>
      {/* <EmployeeCreate /> */}
      <Chatbox/>
    </>
  )
}

export default App
