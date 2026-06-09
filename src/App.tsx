import './App.css'
import { RouterProvider } from 'react-router'
import  {router} from './router/router'
import {Provider} from 'react-redux';
import store from './store/store';

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
      <Provider store={store}>
        <RouterProvider router= {router} />
      </Provider>
    </>
  )
}

export default App

