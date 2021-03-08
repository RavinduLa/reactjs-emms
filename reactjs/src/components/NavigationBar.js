import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';

import {Link} from 'react-router-dom';

class NavigationBar extends React.Component{

    render() {
        return(
            <Navbar bg='warning' variant='light'>

                <Link to={"/"} className={'navbar-brand'}>
                    EMMS
                </Link>

                <Nav className="mr-auto">
                    <Link to={"/dashboard-admin"} className='nav-link'>Dashboard</Link>
                    <Link to={"/inventory"} className='nav-link'>Inventory</Link>
                    <Link to={"/maintenance"} className='nav-link'>Maintenance</Link>
                    <Link to={"/departments"} className='nav-link'>Departments</Link>
                    <Link to={"/testForm"} className='nav-link'>Test</Link>
                    <Link to={"/admin"} className='nav-link'>Admin</Link>
                </Nav>

            </Navbar>
        );
    }
}

export default NavigationBar;