import React from "react";
import {Table} from "react-bootstrap";


class InventoryList extends React.Component{
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
                </tr>

                </thead>

                <tbody>
                <tr align='center'>
                    <td colSpan={6}>No records</td>
                </tr>

                </tbody>
            </Table>
        );
    }
}

export default InventoryList