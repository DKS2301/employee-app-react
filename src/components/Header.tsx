import React from 'react'
import logo from '../assets/images/logo.png'
function Header() {
  return (
    <>
        <header>
            <img src={logo} alt="KeyValue logo" id="logo" />
        </header>
    </>
  )
}

export default Header