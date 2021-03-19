import React from "react";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class Dashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            assetCount: ''
        }

    }

    initialState = {
        assetCount: '',

    }


    componentDidMount() {
        const LOCALHOST_URL = "http://localhost:8080/api/assetCount";
        const URL_GET_ASSET_COUNT = global.con + "/api/assetCount"
        axios.get(LOCALHOST_URL)
            .then(response => response.data)
            .then( (data)  => {
                this.setState( {assetCount: data} );
            } )

    }


    render() {
        const padding ={
            padding:'30px'
        }
        return (
            <div style={padding}>
                <Row>

                    <Col>
                        <Link to={'/inventory'} className={'bg-info text-white'}>
                        <Card >
                            <Card.Header className={'bg-info'}>Asset Count</Card.Header>
                            <Card.Body className={'text-black-50'}>
                                {this.state.assetCount}
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>


                    <Col>
                        <Card>
                            <Card.Header className={'bg-warning'}>Asset Count</Card.Header>
                            <Card.Body>
                                {this.state.assetCount}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Header className={'bg-secondary'}>Asset Count</Card.Header>
                            <Card.Body>
                                {this.state.assetCount}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header className={'bg-light'}>Asset Count</Card.Header>
                            <Card.Body>
                                {this.state.assetCount}
                            </Card.Body>
                        </Card>
                    </Col>


                </Row>

            </div>
        );
    }

}

export default Dashboard;