import React, { type ReactNode } from 'react'
import Navbar from './Navbar'
import Header from './Header'

function Layout({children}:{
    children: ReactNode
}) {
  return (
    <div className='main-body'>
        <Header/>
        <main>
            <Navbar/>
            {children}
        </main>
    </div>
  )
}

export default Layout