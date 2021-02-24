import React from "react";
import InventoryList from "./InventoryList";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class Inventory extends React.Component{

    render() {

        const padding={
            padding:'20px'
        }
            return(
               <Container fluid>
                   <Row style={padding}>
                       <Col xs={10}>
                           <h2>Inventory List</h2>
                       </Col>
                       <Col xs={2}>
                           <Link to={"addInventory"}> Add Inventory  </Link>
                       </Col>
                   </Row>

                   <Row style={padding}>
                       <InventoryList />
                   </Row>

               </Container>

                /*<InventoryList />*/

        );
    }

}

export default Inventory;