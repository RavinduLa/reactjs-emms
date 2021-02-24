import React from "react";
import {Col, Container, Navbar} from "react-bootstrap";

class Footer extends React.Component{
    render() {
        return(
            <Navbar fixed='bottom' bg='light'>
                <Container>
                    <Col className='text-center text-muted'>
                        <div>EMMS -IT</div>

                    </Col>
                </Container>
            </Navbar>
        );
    }
}
export default Footer