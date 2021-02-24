import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';

import {Link} from 'react-router-dom';

class NavigationBar extends React.Component{

    render() {
        return(
            <Navbar bg='dark' variant='dark' >

                <Link to={"/"} className={'navbar-brand'}>
                    EMMS
                </Link>

                <Nav className="mr-auto">
                    <Link to={"/inventory"} className='nav-link'>Inventory</Link>
                    <Link to={"/"} className='nav-link'>Dashboard</Link>
                </Nav>

            </Navbar>
        );
    }
}

export default NavigationBar;