import React from "react"
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

import WarrantyPresentEquipment from "./WarrantyPresentEquipment";
import WarrantyAbsentEquipment from "./WarrantyAbsentEquipment";

class WarrantyFilter extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.iniitialState;

    }

    iniitialState={

        equipmentUnderWarranty:[],
        equipmentNoWarranty: []
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>

                <Row>
                    <Col><p>adfmafd</p></Col>
                    <Col> <WarrantyPresentEquipment /> </Col>
                    <Col> <WarrantyAbsentEquipment /> </Col>
                </Row>

            </div>
        );
    }

}

export default WarrantyFilter;