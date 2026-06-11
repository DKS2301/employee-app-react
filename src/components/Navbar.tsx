import '../App.css';

import users from '@images/users.svg';
import React from 'react';

function Navbar() {
    return (
        <>
            <nav>
                <div className="kv-header">
                    <div>
                        <img src={users} alt="Employee list icon" />
                    </div>
                    <h3>Employee list</h3>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
