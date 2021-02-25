import React from "react";
import {Button, Form, Table} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";


class InventoryList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            equipment: [],

        }
    }

    componentDidMount() {
        /*axios.get("http://localhost:8080/api/equipment")
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
            });

        fetch('http://localhost:8080/api/equipment')
            .then(response => response.json())
            .then(data => console.log(data));*/

        fetch("http://localhost:8080/api/equipment")
            .then(response => response.json())
            .then((data) => {
                this.setState({equipment: data})
            });


    }

    render() {
        return(
            <Table striped bordered hover variant='light'>

                <thead>
                <tr>
                    <th>Asset Id</th>
                    <th>Serial Number</th>
                    <th>Location</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Purchase Date</th>
                    <th>Warranty Months</th>
                </tr>

                </thead>

                <tbody>
                {
                    this.state.equipment.length === 0?
                        <tr align='center'>
                            <td colSpan={6}> {this.state.equipment.length} records available</td>
                        </tr> :
                        this.state.equipment.map( (e) => (
                            <tr key={e.assetId}>
                                <td>{e.assetId}</td>
                                <td>{e.serialNumber}</td>
                                <td>{e.location}</td>
                                <td>{e.brand}</td>
                                <td>{e.model}</td>
                                <td>{e.purchaseDate}</td>
                                <td>{e.warrantyMonths}</td>



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

                            </tr>
                            )

                        )
                }


                </tbody>
            </Table>
        );
    }
}

export default InventoryList