import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";

class DepartmentFilter extends React.Component{

    constructor(props) {
        super(props);

        this.state = this.initialState;

        this.departementFilterChange= this.departementFilterChange.bind(this);
        this.resetDepartmentFilter = this.resetDepartmentFilter.bind(this);
        this.submitDepartmentFilter= this.submitDepartmentFilter.bind(this);
        this.alertItem= this.alertItem.bind(this);
    }

    initialState = {

        deptList: [],
        departmentId: '',
        departmentName: '',
        selectedDepartmentId: '',
        equipment:[],
        filterInitiated:false
    }

    async componentDidMount () {

        const URL_DEPARTMENT = global.con + "/api/allDepartments";

        await axios.get(URL_DEPARTMENT)
            .then( response => response.data)
            .then((data) => {

                this.setState({deptList: data});
                this.setState({departmentId: data[0].did})
                this.setState({departmentName: data[0].departmentName})
                this.setState({selectedDepartmentId: data[0].did})

                console.log("deptList"+ this.state.deptList);
                console.log("Department:" + this.state.departmentId + "\n"+ this.state.departmentName);

            }).catch(error => {
                alert("Cannot get departments: \n Backend server might be down.")
            })

    }

    resetDepartmentFilter= async() => {
        this.setState( () => this.initialState);

        const URL_DEPARTMENT = global.con + "/api/allDepartments";

        await axios.get(URL_DEPARTMENT)
            .then( response => response.data)
            .then((data) => {

                this.setState({deptList: data});
                this.setState({departmentId: data[0].did})
                this.setState({departmentName: data[0].departmentName})

                console.log("deptList"+ this.state.deptList);
                console.log("Department:" + this.state.departmentId + "\n"+ this.state.departmentName);

            }).catch(error => {
                alert("Cannot get departments: \n Backend server might be down.")
            })
    }

    departementFilterChange= (event) => {
        event.preventDefault();
        this.setState({departmentId: event.target.value})
        this.setState({selectedDepartmentId: event.target.value})
    }

    submitDepartmentFilter = async (event) => {
        event.preventDefault();
        const URL_EQUIPMENT = global.con + "/api/getEquipmentForDepartment/";

        this.setState({filterInitiated: true})
        console.log("Selected department id: " + this.state.departmentId)
         await axios.get(URL_EQUIPMENT+this.state.departmentId)
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
                console.log("Selected department id" + this.state.selectedDepartmentId)
            }).catch(error =>{
                alert("Error in getting equipment: \n"+error)
            });

    }

    alertItem = (e) => {
        alert("Asset Id : "+e.assetId+""+ "\n"+"Serial Number: " + e.serialNumber + "\n"+
            "Location : "+ e.location + "\n"+ "Department ID: " + e.department+ "\nDepartment Name: " +e.departmentName+ "\n"+"Category: "+ e.type+ "\n"+
            "Brand: "+e.brand+ "\n" + "Model: "+ e.model + "\nPurchase Date: " + e.purchaseDate + "\n"+
            "Warranty Months: "+e.warrantyMonths +"\nSupplier: "+e.supplier+"\nSupplier Name: " + e.supplierName+ "\n"+ "IP Address; "+e.ipAddress + "\n" +
            "Purchase order Number: "+ e.purchaseOrderNumber + "\n"+ "Workstation Id: "+e.workStationId)
    }


    render() {
        const {departmentId,departmentName}  = this.state;
        const padding={
            padding:'10px'
        }

        //console.log("In render: "+this.state.deptList)
        return (
            <div>
                <div style={padding}>
                    <Card>
                        <Card.Body>
                <Form onReset={this.resetDepartmentFilter.bind(this)} onSubmit={this.submitDepartmentFilter.bind(this)}>
                    <Form.Row>
                        <Form.Group controlId={"formDepartmentFilter"} as={Col}>
                            <Form.Label>Filter by department</Form.Label>
                            <Form.Control
                                 as={"select"} required name={'department'}
                                 defaultValue={"defIt"}
                                 value={departmentId}
                                 onChange={this.departementFilterChange.bind(this)}>


                                {
                                    this.state.deptList.length === 0?
                                        <option>No Depts</option>:
                                        this.state.deptList.map( (e) => (
                                            <option value={e.did} datatype="number">
                                                {e.departmentName}
                                            </option>
                                        ))
                                }

                            </Form.Control>
                        </Form.Group>


                    </Form.Row>
                    <Row>
                        <Col>
                            <Button type={'submit'}  className={'btn btn-primary'}>
                                Filter
                            </Button>
                        </Col>

                        <Col>
                            <Button type={'reset'}  className={'btn btn-secondary'}>
                                Reset
                            </Button>
                        </Col>


                    </Row>
                </Form>

                        </Card.Body>
                    </Card>

                    {
                        this.state.filterInitiated === false?
                            <div><p>Filter to get results</p></div>
                            :

                            <Table striped bordered hover variant='light'>
                                <thead>
                                <tr>
                                    <td>Asset Id</td>
                                    <td>Serial Number</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.equipment.length === 0?
                                        <tr>No records for this Department</tr>:
                                        this.state.equipment.map( (e) => (
                                            <tr key={e.assetId}>
                                                <td>{e.assetId}</td>
                                                <td>{e.serialNumber}</td>
                                                <td>
                                                    <Button className={'btn btn-warning'} onClick={this.alertItem.bind(this,e)}>
                                                        View More Info
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))

                                }
                                </tbody>
                            </Table>
                    }


                </div>
            </div>
        );
    }

}
export default DepartmentFilter