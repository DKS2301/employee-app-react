import Navbar from './Navbar'
import Header from './Header'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div className='main-body'>
        <Header/>
        <main>
            <Navbar/>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout