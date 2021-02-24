import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

class AddInventory extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            assetId: '',
            serialNumber:'',
            location:'',
            brand:'',
            model:'',
            type:'',
            purchaseDate:'',
            warrantyMonths:''
        }
        this.submitEquipment = this.submitEquipment.bind(this);
        this.equipmentChange = this.equipmentChange.bind(this);
    }

    submitEquipment(event){
        alert(
            this.state.assetId+
            this.state.serialNumber+
            this.state.location+
        this.state.brand+
        this.state.model+
        this.state.type+
        this.state.purchaseDate+
        this.state.warrantyMonths);
        event.preventDefault();
    }

    equipmentChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });

    }

    render() {
        const padding={
            padding:'20px'
        }
        return(
            <Container fluid>
                <Col style={padding}>
                    <Card className={'border border-dark bg-light'}>
                        <Card.Header>Add Item to Inventory</Card.Header>

                        <Form id={'addNewInventoryForm'} onSubmit={this.submitEquipment}>
                            <Card.Body>
                                <Form.Row>

                                <Form.Group controlId={"formAssetId"} as={Col}>
                                    <Form.Label>AssetId</Form.Label>
                                    <Form.Control required
                                        type="number"
                                        name={'assetId'}
                                        placeHolder="Enter AssetID"
                                        value={this.state.assetId}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formSerialNo"} as={Col}>
                                    <Form.Label>Serial Number</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'serialNumber'}
                                        placeHolder="Enter Serial Number"
                                        value={this.state.serialNumber}
                                        onChange={this.equipmentChange}/>
                                </Form.Group>

                                <Form.Group controlId={"formLocation"} as={Col}>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'location'}
                                        placeHolder="Enter the initial Location"
                                        value={this.state.location}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>
                                </Form.Row>

                                <Form.Row>

                                <Form.Group controlId={"formLocation"} as={Col}>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'brand'}
                                        placeHolder="Enter brand"
                                        value={this.state.brand}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formLocation"} as={Col}>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'model'}
                                        placeHolder="Enter Model"
                                        value={this.state.model}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formType"} as={Col}>
                                    <Form.Label>Equipment Type</Form.Label>
                                    <Form.Control
                                        required as={"select"} name={'type'}
                                        defaultValue={"PC"}
                                        value={this.state.type}
                                        onChange={this.equipmentChange}>

                                        <option>PC</option>
                                        <option>Networking</option>

                                    </Form.Control>
                                </Form.Group>

                                </Form.Row>

                                <Form.Row>

                                <Form.Group controlId={"formPurchaseDate"} as={Col}>
                                    <Form.Label>Purchase Date</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        name={'purchaseDate'}
                                        value={this.state.purchaseDate}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formWarrantyMonths"} as={Col}>
                                    <Form.Label>Warranty Months</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name={'warrantyMonths'}
                                        placeHolder="Enter number of warranty months"
                                        value={this.state.warrantyMonths}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>


                                </Form.Row>


                            </Card.Body>

                            <Card.Footer>
                                <Button className={'btn btn-success'} type={'submit'}>Add Item</Button>
                            </Card.Footer>
                        </Form>



                    </Card>
                </Col>

            </Container>
        );
    }

}
export default AddInventory;