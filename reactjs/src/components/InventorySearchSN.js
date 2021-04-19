import React from "react";
import axios from "axios";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

class InventorySearchSN extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.submitSearch = this.submitSearch.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    initialState ={
        equipment:'',
        assetId:'',
        serialNumber:'',
        location:'',
        department:''
    }

    componentDidMount() {
    }

    resetSearch= (event) =>{
        this.setState( () => this.initialState);
    }

    changeSearch=(event) =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    submitSearch = async (event) => {
        event.preventDefault();
        const URL_SEARCHINVENTORY = global.con+"/api/getEquipmentForSerialNumber/";
        this.setState({serialNumber: event.target.value});
        await axios.get(URL_SEARCHINVENTORY + this.state.serialNumber)
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
                this.setState({assetId: data.assetId})
                this.setState({serialNumber: data.serialNumber})
                this.setState({location: data.location})
                this.setState({department: data.department})
                console.log(this.state.equipment)

            })
    }

    render() {
        const {serialNumber} = this.state;
        const padding={
            padding:'10px'
        }
        return (
            <div>

                <div style={padding}>

                    <Form onReset={this.resetSearch.bind(this) } onSubmit={this.submitSearch.bind(this)} id={'searchBySNForm'}>
                        <Card>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group controlId={'formAssetId'} as={Col}>
                                    <Form.Label>Search by Serial Number</Form.Label>
                                    <Form.Control required
                                                  type="text"
                                                  name={'serialNumber'}
                                                  placeHolder={"Serial Number"}
                                        /*defaultValue={'123'}*/
                                                  value={serialNumber}

                                                  onChange={this.changeSearch}
                                    />
                                </Form.Group>


                            </Form.Row>

                            <Form.Row>
                                <Row>
                                    <Col>
                                        <Button type={'submit'} onSubmit={this.submitSearch.bind(this)} className={'btn btn-primary'}>Search</Button>
                                    </Col>
                                    <Col>
                                        <Button type={'reset'} onReset={this.resetSearch.bind(this)} className={'btn btn-secondary'}>Reset</Button>
                                    </Col>
                                </Row>


                            </Form.Row>
                        </Card.Body>
                        </Card>
                    </Form>

                    {/*{
                    this.state.equipment === ''?
                        <div>Search to get results</div>   :

                        <div>  {new DisplayItem(this.state.equipment)  }  </div>
                }*/}

                    {
                        this.state.equipment === '' ?
                            <div>
                                Search to get results
                            </div> :

                            this.state.assetId === 0 ?
                                <div><h1>No results</h1></div> :
                            <div>
                                <Table striped bordered hover variant='success'>
                                    <tr>
                                        <td>Asset Id</td>
                                        <td>{this.state.assetId}</td>
                                    </tr>
                                    <tr>
                                        <td>Serial Number</td>
                                        <td>{this.state.serialNumber}</td>
                                    </tr>

                                    <tr>
                                        <td>Location</td>
                                        <td>{this.state.location}</td>
                                    </tr>

                                    <tr>
                                        <td>Department</td>
                                        <td>{this.state.department}</td>
                                    </tr>
                                </Table>
                            </div>
                    }
                </div>


            </div>
        );
    }

}

export default InventorySearchSN;