import React from "react";
import {Button, Container, Table} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import Toast1 from "./Toast1";


class InventoryList extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show=  false
        this.state={
            equipment: [],
        }
    }
    initialState ={
        equipment: []
    }

    componentDidMount() {

        /*axios.get("http://localhost:8080/api/equipment")
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
            });*/

        const URL_LOCALHOST = "http://localhost:8080/api/equipment";
        const URLIP = "http://172.31.8.58:8080/api/equipment";
        const DELETE_LOCALHOST_URL = "http://localhost:8080/api/deleteEquipment/";

        axios.get(URL_LOCALHOST)
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
            });

        /*fetch('http://localhost:8080/api/equipment')
            .then(response => response.json())
            .then(data => console.log(data));*/

        /*fetch("http://localhost:8080/api/equipment",{mode:'cors'})
            .then(response => response.json())
            .then((data) => {
                this.setState({equipment: data})
            });*/


    }

    deleteItem = (assetId) =>{

        const URL_LOCALHOST = "http://localhost:8080/api/equipment";
        const URL_IP = "http://172.31.8.58:8080/api/equipment";
        const DELETE_LOCALHOST_URL = "http://localhost:8080/api/deleteEquipment/";

        axios.delete(DELETE_LOCALHOST_URL+assetId)
            .then(response => {
               if(response.data != null){
                   //alert("Item deleted");
                   this.setState({"show" : true})
                   setTimeout(() => this.setState({"show" : false}),3000)
                   this.setState({
                       equipment: this.state.equipment.filter(equipment => equipment.assetId !== assetId)
                   })
               }
            });
    }

    render() {
        return(
            <Container fluid>
            <div>
                    <div style={{"display":this.state.show ? "block" :"none" }}>
                        <Toast1
                            children={{show:this.state.show,
                                message:"Equipment deleted successfully",
                                type: 'danger'}}/>
                    </div>
                <Table striped bordered hover variant='light'>

                    <thead>
                    <tr>
                        <th>Asset Id</th>
                        <th>Serial Number</th>
                        <th>Location</th>
                        <th>Department</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Purchase Date</th>
                        <th>Warranty Months</th>
                        <th>IP address</th>
                        <th>PO Number</th>
                        <th>Workstation ID</th>
                    </tr>

                    </thead>

                    <tbody>
                    {
                        this.state.equipment.length === 0?
                            <tr align='center'>
                                <td colSpan={6}> {this.state.equipment.length} records available </td>
                            </tr> :
                            this.state.equipment.map( (e) => (
                                    <tr key={e.assetId}>
                                        <td>{e.assetId}</td>
                                        <td>{e.serialNumber}</td>
                                        <td>{e.location}</td>
                                        <td>{e.department}</td>
                                        <td>{e.brand}</td>
                                        <td>{e.model}</td>
                                        <td>{e.purchaseDate}</td>
                                        <td>{e.warrantyMonths}</td>
                                        <td>{e.ipAddress}</td>
                                        <td>{e.purchaseOrderNumber}</td>
                                        <td>{e.workStationId}</td>



                                        <td>
                                            <Link to={{
                                                pathname: '/singleEquipment',
                                                data: {
                                                    assetId: e.assetId,
                                                    serialNumber: e.serialNumber,
                                                    location: e.location,
                                                    brand: e.brand,
                                                    model: e.model,
                                                    purchaseDate: e.purchaseDate,
                                                    warrantyMonths: e.warrantyMonths,
                                                },
                                            }} >
                                                View
                                            </Link>
                                        </td>

                                        <td>
                                            <Link to={{
                                                pathname: '/updateEquipment',
                                                data: {
                                                    assetId: e.assetId,
                                                },
                                            }} >
                                                Edit Item details
                                            </Link>
                                        </td>

                                        <td>

                                            <Button
                                                onClick={this.deleteItem.bind(this,e.assetId)}
                                                className={'btn btn-danger'}>Delete</Button>
                                        </td>

                                    </tr>
                                )

                            )
                    }


                    </tbody>
                </Table>
            </div>
            </Container>

        );
    }
}

export default InventoryList