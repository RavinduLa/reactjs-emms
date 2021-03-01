import React from "react";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";

class Welcome extends React.Component{


    render() {
        const marginTop = {
            marginTop:'20px'
        };
        return (
            <Container>

                <Row>
                    <Col style={marginTop}>
                        <Jumbotron className='bg-info text-white' >
                            <h1>Welcome to the EMMS</h1>
                            <p>
                               This is the Equipment Maintenance Management System of  CPC IT function
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>

            </Container>
        );
    }
}
export default Welcome;