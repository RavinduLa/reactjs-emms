import React from "react";
import {Button, Card, Container, Table, Col, Row} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";

class SingleEquipment extends React.Component{
    constructor(props) {
        super(props);

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
                        ipAddress: data.ipAddress,
                        purchaseOrderNumber: data.purchaseOrderNumber,
                        workStationId: data.workStationId
                    }
            }
        )

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
                        ipAddress: data.ipAddress,
                        purchaseOrderNumber: data.purchaseOrderNumber,
                        workStationId: data.workStationId
                    }
            }
        )

        const URL_LOCALHOST = "http://localhost:8080/api/getequipmentById/";
        axios.get(URL_LOCALHOST+this.state.equipment)
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
            });
    }

    deleteItem = (assetId) => {

        axios.delete("http://localhost:8080/api/deleteEquipment/"+assetId)
            .then(response => {
                if(response.data != null){
                    alert("Item deleted");
                }
            });
    };


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

                            <tr>
                                <td>
                                    <Card.Subtitle>IP address</Card.Subtitle>
                                    <Card.Text>{this.state.equipment.ipAddress}</Card.Text>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <Card.Subtitle>Purchase Order Number</Card.Subtitle>
                                    <Card.Text>{this.state.equipment.purchaseOrderNumber}</Card.Text>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <Card.Subtitle>Workstation Id</Card.Subtitle>
                                    <Card.Text>{this.state.equipment.workStationId}</Card.Text>
                                </td>
                            </tr>

                            </tbody>
                        </Table>

                    </Card.Body>

                    <Card.Footer>
                        <Row>
                        <Col>
                            <Button onClick=
                                        {this.deleteItem.bind(this,this.state.equipment.assetId)}
                                    className={'btn btn-danger'}>Delete Item from inventory
                            </Button>
                        </Col>

                        <Col>
                            <Link to={"/EditEquipment"}  className={'btn btn-warning'}>Update Item in inventory</Link>
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