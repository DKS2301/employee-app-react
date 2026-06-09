import './App.css'
import { RouterProvider } from 'react-router'
import  {router} from './router/router'
import {Provider} from 'react-redux';
// import store from './store/store';

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
      {/* <Provider store={store}>

      </Provider> */}
        <RouterProvider router= {router} />
    </>
  )
}

export default App

