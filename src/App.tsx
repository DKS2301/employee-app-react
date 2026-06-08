import './App.css'
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

