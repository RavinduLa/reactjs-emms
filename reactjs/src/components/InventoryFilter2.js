import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

import DepartmentFilter from "./DepartmentFilter";
import LocationFilter from "./LocationFilter";
import SupplierFilter from "./SupplierFilter";

class InventoryFilter2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.resetInventoryFilter=this.resetInventoryFilter.bind(this);
        this.submitFilter=this.submitFilter.bind(this);
    }

    initialState = {

        filterOption: 'department'
    }

    componentDidMount(){

    }

    resetInventoryFilter=(event) => {
        event.preventDefault();
    }

    changeSelection=(event)=>{
        event.preventDefault();
        this.setState({filterOption: event.target.value})
    }

    submitFilter=(event) => {

    }

    render() {
        const padding={
            padding:'10px'
        }
        return (
            <div>
                <div style={padding}>
                    <Row>
                        <Col>
                    <Form onReset={this.resetInventoryFilter.bind(this)} onSubmit={this.submitFilter.bind(this)}>

                        <Form.Row>
                            <Form.Group>
                                <Form.Label><h4>Filter By</h4></Form.Label>
                                <Form.Control
                                as={"select"} required name={'selectFIlterOption'}
                                value={this.state.filterOption}
                                onChange={this.changeSelection.bind(this)}>

                                    <option value={'department'}>Department</option>
                                    <option value={'location'}>Location</option>
                                    <option value={'supplier'}>Supplier</option>

                                </Form.Control>
                            </Form.Group>
                        </Form.Row>


                    </Form>
                        </Col>


                    </Row>
                    <Row>
                        <Col>
                            {
                                this.state.filterOption === 'department'?
                                    <DepartmentFilter />:
                                    this.state.filterOption === 'location'?
                                        <LocationFilter />:
                                        <SupplierFilter />
                            }
                        </Col>
                    </Row>


                </div>
            </div>
        );
    }

}
export default InventoryFilter2;