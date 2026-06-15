import '../App.css';

import users from '@images/users.svg';
import { useNavigate } from 'react-router';

function Navbar() {
    const navigate = useNavigate();
    return (
        <>
            <nav>
                <div className="kv-header">
                    <div onClick={() => navigate('/employee')}>
                        <img src={users} alt="Employee list icon" />
                    </div>
                    <h3>Employee list</h3>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
