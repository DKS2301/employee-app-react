import { Outlet } from 'react-router';

import Header from './Header';
import Navbar from './Navbar';

function Layout() {
    return (
        <div className="main-body">
            <Header />
            <main>
                <Navbar />
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
