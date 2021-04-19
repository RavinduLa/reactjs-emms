import React from "react";
import {Link} from "react-router-dom";
import InventorySearch from "./InventorySearch";
import {Col, Row} from "react-bootstrap";
import InventorySearchSN from "./InventorySearchSN";

class InventoryLanding extends React.Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>Inventory</h1>


                <Row>
                    <Col><InventorySearch/></Col>
                    <Col><InventorySearchSN/></Col>
                </Row>
                <Link>Filter By Department</Link>
                <Link>Filter By Location</Link>
                <Link>Filter By Supplier</Link>
            </div>
        );
    }


}
export default InventoryLanding;