import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import UserDetails from "./UserDetails";

class Header extends React.Component{

    render() {
        const padding ={
            padding:'20px'
        }
        return(
            <Container fluid>
                <Row  style={padding}>
                    <Col xs={10} >
                        logo
                    </Col>

                    <Col xs={2}>
                        <UserDetails />
                    </Col>
                </Row>

            </Container>
        );
    }

}

export default Header;