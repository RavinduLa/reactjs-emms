import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import Toast1 from "./Toast1";
import Toast2 from "./Toast2";


class AddInventory extends React.Component{

    constructor(props) {
        super(props);
        this.state= this.initialState;
        this.state.show = false;
        this.state.idWarningShow = false;
        this.submitEquipment = this.submitEquipment.bind(this);
        this.equipmentChange = this.equipmentChange.bind(this);
    }

    initialState = {
        assetId: '',
        serialNumber:'',
        location:'',
        brand:'',
        model:'',
        type:'',
        purchaseDate:'',
        warrantyMonths:'',
        idAvailabilityStatus: ''
    }

    submitEquipment = event => {
        //alert()

        event.preventDefault();
        const URLLocalHost = "http://localhost:8080/api/addEquipment";
        const URLIP = "http/192.168.12.9:8080/api/addEquipment";

        //creating a json object
        const equipment = {
            assetId: this.state.assetId,
            serialNumber: this.state.serialNumber,
            location: this.state.location,
            brand: this.state.brand,
            model: this.state.model,
            type: this.state.type,
            purchaseDate: this.state.purchaseDate,
            warrantyMonths: this.state.warrantyMonths,
        }


        this.isAssetIdAvailable();
        if(this.state.idAvailabilityStatus == 'available'){
            //alert("Id is not available")
            console.log("Id status: available");

            axios.post(URLLocalHost,equipment)
                .then(response =>{
                    if(response.data != null){
                        this.setState({"show" : true})
                        setTimeout(() => this.setState({"show" : false}),3000)
                        //alert("Equipment added to the inventory succesfully")
                    }
                    else {
                        this.setState({"show" : false})
                    }
                }).catch( (reject) => {
                alert("rejected: " +reject);
            })
            this.setState(this.initialState);
        }
        else{
            console.log("id status: unavailable");
        }

    }


    isAssetIdAvailable = (status) =>{
        if(this.state.assetId == null){
            console.log("Asset id is null");
        }
        else {
            console.log("Asset id: " + this.state.assetId);
            axios.get("http://localhost:8080/api/checkIdAvailability/"+this.state.assetId)
                .then(response => {
                    if(response.data == true){
                        console.log("Id is not used");
                        this.state.idAvailabilityStatus = 'available';

                        //this.state.idWarningShow = false;
                        return true;
                    }
                    else {
                        console.log("Id is used already");
                        this.setState({"idWarningShow" : true})
                        setTimeout(() => this.setState({"idWarningShow" : false}),3000)
                        return  false;
                    }
                }).catch( (error) => {
                alert("Error: "+ error)
            });
        }

        };

    equipmentChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });

    }

    resetEquipment = () => {
        this.setState( () => this.initialState);

    }

    toggleToastShow = () => {
        this.setState({"show" : false})
    }



    render() {
        const padding={
            padding:'20px'
        }

        const {assetId,serialNumber,location,brand,model,type,purchaseDate,warrantyMonths} = this.state;
        return(

            <Container fluid>

                {/*<Col style={padding}>*/}

                        <div style={{"display":this.state.show ? "block" :"none" }}>
                            <Toast1
                                children={{
                                    show:this.state.show,
                                    message:"Equipment added successfully",
                                    type: 'success',
                                }} />
                        </div>

                <div style={{"display":this.state.idWarningShow ? "block" :"none" }}>
                    <Toast2
                        children={{

                            show:this.state.idWarningShow,
                            message:"Id is already used",
                            type: 'warning',
                        }} />
                </div>


                <div style={padding}>
                    <Card className={'border border-dark bg-light'}>
                        <Card.Header>Add Item to Inventory</Card.Header>

                        <Form onReset={this.resetEquipment} id={'addNewInventoryForm'}
                              onSubmit={this.submitEquipment}>
                            <Card.Body>
                                <Form.Row>

                                <Form.Group controlId={"formAssetId"} as={Col}>
                                    <Form.Label>AssetId</Form.Label>
                                    <Form.Control required
                                        type="number"
                                        name={'assetId'}
                                        placeholder="Enter AssetID"
                                        //value={this.state.assetId}
                                        //this was here earlier
                                        // later removed .state
                                        value={assetId}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formSerialNo"} as={Col}>
                                    <Form.Label>Serial Number</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'serialNumber'}
                                        placeholder="Enter Serial Number"
                                        value={serialNumber}
                                        onChange={this.equipmentChange}/>
                                </Form.Group>

                                <Form.Group controlId={"formLocation"} as={Col}>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'location'}
                                        placeholder="Enter the initial Location"
                                        value={location}
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
                                        placeholder="Enter brand"
                                        value={brand}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formLocation"} as={Col}>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'model'}
                                        placeholder="Enter Model"
                                        value={model}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formType"} as={Col}>
                                    <Form.Label>Equipment Type</Form.Label>
                                    <Form.Control
                                        required as={"select"} name={'type'}
                                        defaultValue={"PC"}
                                        value={type}
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
                                        value={purchaseDate}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formWarrantyMonths"} as={Col}>
                                    <Form.Label>Warranty Months</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name={'warrantyMonths'}
                                        placeholder="Enter number of warranty months"
                                        value={warrantyMonths}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>


                                </Form.Row>


                            </Card.Body>

                            <Card.Footer>
                                <Row>
                                    <Col>
                                        <Button className={'btn btn-success'} type={'submit'}>Add Item</Button>
                                    </Col>
                                    <Col>
                                        <Button className={'btn btn-secondary'} type={'reset'}>Reset Values</Button>
                                    </Col>

                                    <Col>
                                        <Button className={'btn btn-info'} onClick={this.isAssetIdAvailable}>
                                            Check asset id
                                        </Button>
                                    </Col>
                                </Row>


                            </Card.Footer>
                            {/*<Card.Footer>
                                <Button className={'btn btn-secondary'} type={'reset'}>Reset Values</Button>
                            </Card.Footer>*/}
                        </Form>



                    </Card>

                {/*</Col>*/}

                </div>

            </Container>
        );
    }

}
export default AddInventory;