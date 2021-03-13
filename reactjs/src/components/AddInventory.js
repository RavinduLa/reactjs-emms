import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import Toast1 from "./Toast1";
import Toast2 from "./Toast2";
import async from "async";


class AddInventory extends React.Component{



    constructor(props) {
        super(props);
        this.state= this.initialState;
        this.state.show = false;
        this.state.idWarningShow = false;
        this.state={
            type:'',
            deptList: [],
            categoryList: [],
            brandList: [],
            modelList: [],
            filteredBrandList: [],
            filteredModelList: [],
            combinationList: [],

        }
        this.submitEquipment = this.submitEquipment.bind(this);
        this.equipmentChange = this.equipmentChange.bind(this);
        this.departmentChange = this.departmentChange.bind(this);
        this.brandChange = this.brandChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.modelChange = this.modelChange.bind(this);
        this.updateBrands = this.updateBrands.bind(this)
    }

    initialState = {
        assetId: '',
        serialNumber:'',
        location:'',
        department:'',
        brand:'',
        model:'',
        type:'',
        purchaseDate:'',
        warrantyMonths:'',
        idAvailabilityStatus: '',
        purchaseOrderNumber: '',
        ipAddress: '',
        workStationId: '',

        departmentList:[],
        deptList: [],
        categoryList: [],
        brandList: [],
        modelList: [],
        filteredBrandList: [],
        filteredModelList: [],
        combinationList: []
    }

    async componentDidMount () {

        const LOCAL_HOST_URL_DEPARTMENTS = "http://localhost:8080/api/allDepartments";
        const LOCAL_HOST_URL_CATEGORIES = "http://localhost:8080/api/allCategories";
        const LOCAL_HOST_URL_BRANDS = "http://localhost:8080/api/allBrands";
        const LOCAL_HOST_URL_MODELS = "http://localhost:8080/api/allModels";

        await axios.get(LOCAL_HOST_URL_DEPARTMENTS)
            .then( response => response.data)
            .then((data) =>{

                this.setState({deptList: data})
                this.setState({department: data[0].departmentName})

            }).catch(error => {
                alert(error)
        });

        await axios.get(LOCAL_HOST_URL_CATEGORIES)
            .then(response => response.data)
            .then( (data) => {

                console.log("Setting category list and type")
                console.log("type: " + this.state.type)

                this.setState({categoryList: data}  )
                this.setState({type: data[0].categoryName}  )
                //this.state.type = data[0].categoryName

                console.log("type: " + this.state.type)

            }).catch(error => {
                alert(error)
        });

        const LOCAL_HOST_URL_FIND_BRANDS = "http://localhost:8080/api/getBrandsForCategory/";
        console.log("type before find brands : " + this.state.type)
        await axios.get(LOCAL_HOST_URL_FIND_BRANDS + this.state.type)
            .then(response => response.data)
            .then(  (data) => {
                this.setState( {filteredBrandList:data})
            }).catch(error => {
            alert(error)
        })

        /*console.log("Category List: "+ this.state.categoryList)
        await axios.get(LOCAL_HOST_URL_BRANDS)
            .then(response => response.data)
            .then( (data) => {
                this.setState({brandList: data})
                this.setState({brand: data[0].brandName})
            }).catch(error => {
            alert(error)
        })*/



        //this.updateBrands()
    }

    createSelectItems(){
        let items2= [];
        let items = [];
        const LOCAL_HOST_URL = "http://localhost:8080/api/allDepartments";
        axios.get(LOCAL_HOST_URL)
            .then(response => {
                if(response.data != null){
                    items2 = response.data;

                }
            })

        for( let i = 0; i < items2.length; i++){
            items.push(<option key={i} value={i}>{i}</option>)
        }

        return items;
    }

    submitEquipment = (event) => {
        //alert()

        event.preventDefault();
        const URLLocalHost = "http://localhost:8080/api/addEquipment";
        const URLIP = "http/192.168.12.9:8080/api/addEquipment";

        //creating a json object
        const equipment = {
            assetId: this.state.assetId,
            serialNumber: this.state.serialNumber,
            location: this.state.location,
            department: this.state.department,
            brand: this.state.brand,
            model: this.state.model,
            type: this.state.type,
            purchaseDate: this.state.purchaseDate,
            warrantyMonths: this.state.warrantyMonths,
            purchaseOrderNumber: this.state.purchaseOrderNumber,
            ipAddress: this.state.ipAddress,
            workStationId: this.state.workStationId,
        }


        this.isAssetIdAvailable();
        if(this.state.idAvailabilityStatus == 'available'){
            //alert("Id is not available")
            console.log("Id status: available");

            //console.log("Equipment: " + this.state.equipment.purchaseDate)
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
                })
                .catch( (reject) => {
                alert("rejected: " +reject);
            })
            //this.setState(this.initialState);
            //this.setState( () => this.initialState);
            this.resetEquipment();
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
    onDropDownSelected (e) {

        //this.state.department =  e.target.value;
        console.log("THE VAL", e.target.value);

    }

    equipmentChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });

    }

    departmentChange  = (event) =>{
        //this.setState({department: event.value})
        console.log("dept value: "+event.target.value)
        //this.state.department = event.value;
        this.setState({department : event.target.value})
    }

    categoryChange  =  async(event) => {

        this.setState({type: event.target.value})
        console.log("Category Change")

        const LOCAL_HOST_URL_FIND_BRANDS = "http://localhost:8080/api/getBrandsForCategory/";
        await axios.get(LOCAL_HOST_URL_FIND_BRANDS+this.state.type)
            .then(response => response.data)
            .then(  (data) => {
                this.setState( {filteredBrandList:data})
            }).catch(error => {
            alert(error)
        })

        this.updateBrands()
    }

    updateBrands =() => {
        const LOCAL_HOST_URL_FIND_BRANDS = "http://localhost:8080/api/getBrandsForCategory/";
        axios.get(LOCAL_HOST_URL_FIND_BRANDS+this.state.type)
            .then(response => response.data)
            .then(  (data) => {
                this.setState( {filteredBrandList:data})
            }).catch(error => {
            alert(error)
        })
    }

    brandChange = (event) => {
        event.preventDefault()
        this.setState({category: event.target.value})
    }

    updateModels = () => {

    }

    modelChange = (event) => {

    }

    /*change: function(event){
        this.setState({de})

    }*/

    resetEquipment = () => {
        this.setState( () => this.initialState);
        const LOCAL_HOST_URL = "http://localhost:8080/api/allDepartments";
        axios.get(LOCAL_HOST_URL)
            .then( response => response.data)
            .then((data) => {
                this.setState({deptList: data})
            });
    }

    toggleToastShow = () => {
        this.setState({"show" : false})
    }



    render() {
        const padding={
            padding:'10px'
        }


        /*let axiosResponse = axios.get("http://localhost:8080/api/allDepartments")
            .then( response => {
                if(response.data != null){
                    Data = response.data;
                    for(let i = 0; i < response.data.length; i++){
                        Data[i] = response.data.departmentName
                    }
                    console.log("Data"+Data)
                }
                else {
                    alert("department list empty")
                }
            }).catch(error => {
                alert(error)
            })
        let Data =[],
            MakeItem= function (X){
                return <option>{X}</option>
            }*/


        const {assetId,serialNumber,location,department,brand,model,type,purchaseDate,warrantyMonths} = this.state;
        return(

            <Container fluid>

                {/*<Col style={padding}>*/}

                <div style={padding}>

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



                    <Card className={'border border-dark bg-light'}>
                        <Card.Header>Add Item to Inventory</Card.Header>

                        <Form onReset={this.resetEquipment.bind(this)} id={'addNewInventoryForm'}
                              onSubmit={this.submitEquipment.bind(this)}>
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




                                    <Form.Group controlId={"formDepartment"} as={Col}>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control
                                             as={"select"} required name={'department'}
                                            defaultValue={"IT"}
                                            value={department}
                                            onChange={this.departmentChange.bind(this)}>


                                            {
                                                this.state.deptList.length === 0?
                                                    <option>No depts</option>:
                                                    this.state.deptList.map( (e) =>(
                                                        <option  value={e.departmentName} datatype="text">
                                                            {e.departmentName}
                                                        </option>
                                                    ))
                                            }

                                        </Form.Control>
                                    </Form.Group>



                                </Form.Row>

                                <Form.Row>

                                    <Form.Group controlId={"formType"} as={Col}>
                                        <Form.Label>Equipment Category</Form.Label>
                                        <Form.Control
                                            required as={"select"} name={'type'}
                                            defaultValue={"PC"}
                                            value={type}
                                            onChange={this.categoryChange.bind(this)}>

                                            {
                                                this.state.categoryList.length === 0?
                                                    <option>No Categories</option>:
                                                    this.state.categoryList.map( (e) =>(
                                                        <option  value={e.categoryName} datatype="text">
                                                            {e.categoryName}
                                                        </option>
                                                    ))
                                            }

                                        </Form.Control>
                                    </Form.Group>

                                <Form.Group controlId={"formBrand"} as={Col}>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        required
                                        as={'select'}
                                        name={'brand'}
                                        value={brand}
                                        onChange={this.brandChange.bind(this)}
                                    >
                                        {
                                            this.state.filteredBrandList.length === 0?
                                                <option>No Brands!!</option>:
                                                this.state.filteredBrandList.map( (e) => (
                                                    <option value={e.brandName}>{e.brandName}</option>
                                                ))
                                        }
                                    </Form.Control>


                                </Form.Group>

                                <Form.Group controlId={"formModel"} as={Col}>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'model'}
                                        placeholder="Enter Model"
                                        value={model}
                                        onChange={this.equipmentChange}
                                    >

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

                                    <Form.Group controlId={"formPurchaseOrderNumber"} as={Col}>
                                        <Form.Label>Purchase Order Number</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name={'purchaseOrderNumber'}
                                            placeholder="Enter the purchase order number"

                                            value={this.state.purchaseOrderNumber}

                                            onChange={this.equipmentChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId={"formIpAddress"} as={Col}>
                                        <Form.Label>IP address</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name={'ipAddress'}
                                            placeholder="Enter the purchase order number"
                                            value={this.state.ipAddress}
                                            onChange={this.equipmentChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId={"formWorkstationId"} as={Col}>
                                        <Form.Label>Workstation Id</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name={'workStationId'}
                                            placeholder="Enter the workstation id"
                                            value={this.state.workStationId}
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