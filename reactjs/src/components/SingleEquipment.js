import React from "react";
import {Button, Card, Container, Table, Col, Row} from "react-bootstrap";

class SingleEquipment extends React.Component{
    constructor(props) {
        super(props);

        //const {data} = this.props.location;

        this.state = {
            /*equipment : {
                assetId: '',
                serialNumber: '',
                location: '',
                brand: '',
                model: '',
                purchaseDate: '',
                warrantyMonths: '',
            },*/

            equipment:''
        }



    }

    componentDidMount() {
        const {data} = this.props.location;

        this.setState(
            {equipment:
                    {
                        assetId: data.assetId,
                        serialNumber: data.serialNumber,
                        location: data.location,
                        brand: data.brand,
                        model: data.model,
                        purchaseDate: data.purchaseDate,
                        warrantyMonths: data.warrantyMonths,
                    }
            }
        )
    }

    deleteItem(){
        fetch("http://localhost:8080/api/deleteEquipment"+this.state.equipment.assetId)
            .then(response => response.json())
            .then((data) => {
                this.setState({equipment: data})
            });
    }

    render() {
        //const {data} = this.props.location;
        const padding = {
            padding:'40px'
        }
        return (
            <div>
                <Container style={padding}>
                <Card  bg={'light'}>
                    <Card.Header><Card.Title>Asset ID: {this.state.equipment.assetId}</Card.Title></Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant='light'>
                            <tbody>
                            <tr>
                                <td>
                                    <Card.Subtitle>Serial Number</Card.Subtitle>
                                    <Card.Text>{this.state.equipment.serialNumber}</Card.Text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Card.Subtitle>Location</Card.Subtitle>
                                    <Card.Text>{this.state.equipment.location}</Card.Text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Card.Subtitle>Brand</Card.Subtitle>
                                    <Card.Text>{this.state.equipment.brand}</Card.Text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Card.Subtitle>Model</Card.Subtitle>
                                    <Card.Text>{this.state.equipment.model}</Card.Text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Card.Subtitle>Purchase Date</Card.Subtitle>
                                    <Card.Text>{this.state.equipment.purchaseDate}</Card.Text>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Card.Subtitle>Warranty Months</Card.Subtitle>
                                    <Card.Text>{this.state.equipment.warrantyMonths}</Card.Text>
                                </td>
                            </tr>
                            </tbody>
                        </Table>

                    </Card.Body>

                    <Card.Footer>
                        <Row>
                        <Col>
                            <Button onClick={this.deleteItem()} className={'btn btn-danger'}>Delete Item from inventory</Button>
                        </Col>

                        <Col>
                            <Button  className={'btn btn-warning'}>Update Item in inventory</Button>
                        </Col>

                        </Row>


                    </Card.Footer>
                </Card>
                </Container>
                {/*single equipment = {data.assetId}
                {data.brand}*/}
            </div>
        );
    }
}

export default SingleEquipment;