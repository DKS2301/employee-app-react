import React, { useState } from 'react'
import Header from '../../components/Header'

function LandingPage() {
    return (
        <>
        <Header/>
        <main className='landing-page'>
            <div className="banner-image">
                <div>
                <img src="./src/assets/images/working-people.png" alt="Banner image"/>
                </div>
            </div>
            <div className='landing-right'>
                <h4>Keyvalue</h4>
                <h1>Employee Application</h1>
            </div>
        </main>
        </>
  )
}

export default LandingPage