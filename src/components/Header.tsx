import logo from '@images/logo.png';
import React from 'react';

function Header() {
    return (
        <>
            <header>
                <img src={logo} alt="KeyValue logo" id="logo" />
            </header>
        </>
    );
}

export default Header;
