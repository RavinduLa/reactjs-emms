import React from "react";
import Toast1 from "./Toast1";
import Toast2 from "./Toast2";
import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "axios";

class AddBrand extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show = false
        this.state.nameWarningShow = false

        this.submitBrand.bind(this)
        this.resetBrand.bind(this)
        this.isBrandAvailable.bind(this)

    }

    componentDidMount() {
    }

    initialState ={
        nameWarningShow:'',
        brandAvailabilityStatus: '',
        brandName: '',

    }

    submitBrand = event =>{
        event.preventDefault();
        const URL_LOCALHOST_ADD = "http://localhost:8080/api/addBrand"

        const brand ={
            brandName: this.state.brandName
        }

        this.isBrandAvailable()

        if(this.state.brandAvailabilityStatus == 'available'){
            console.log("Brand is available")
            axios.post(URL_LOCALHOST_ADD,brand)
                .then(response => {
                    if(response.data !=  null){
                        this.resetBrand();
                        this.setState({"show": true})
                        setTimeout( () => this.setState( {"show":false}),3000)
                    }
                    else {
                        this.setState({"show":false})
                    }
                }).catch(reject => {
                    alert("Rejected: "+reject)
            })

            //this.resetBrand.bind(this)
        }
        else {
            console.log("Brand is not available")
        }


    }
    async isBrandAvailable(){

        if(this.state.brandName == null){
            console.log("Brand name is null")
        }
        else{
            const URL_LOCALHOST = "http://localhost:8080/api/isBrandAvailable/";
            await axios.get(URL_LOCALHOST+this.state.brandName)
                .then( response => {
                    if(response.data ==  true){
                        console.log("Brand availability statue set available");
                        this.state.brandAvailabilityStatus = 'available'
                        return true;
                    }
                    else {
                        console.log("Brand availability statue set unavailable");
                        this.state.brandAvailabilityStatus = 'unavailable'
                        this.setState({"nameWarningShow" : true})
                        setTimeout(() => this.setState({"nameWarningShow" : false}),3000)
                        return  false;
                    }
                }).catch(error => {
                    alert(error)
            })
        }

    }
    resetBrand = () => {

        this.setState( () => this.initialState)
    }
    brandChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return (
            <div>

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{
                            show:this.state.show,
                            message:"Brand added successfully",
                            type: 'success',
                        }} />
                </div>

                <div style={{"display":this.state.nameWarningShow ? "block" :"none" }}>
                    <Toast2
                        children={{
                            show:this.state.nameWarningShow,
                            message:"Brand is already entered",
                            type: 'info',
                        }} />
                </div>

                <Form onSubmit={this.submitBrand.bind(this)} onReset={this.resetBrand.bind(this)}
                      id={'addNewBrandForm'}>

                    <Form.Row>
                        <Form.Group controlId={'formBrandName'} as={Col}>
                            <Form.Label>Brand Name</Form.Label>

                            <Form.Control
                                required
                                type="text"
                                name={'brandName'}
                                plceholder="Enter Brand"
                                defaultValue={this.state.brandName}

                                onChange={this.brandChange}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Button type={'submit'} className={'btn btn-success'}>Submit</Button>
                    <Button type={'reset'} className={'btn btn-info'}>Clear</Button>

                </Form>


            </div>
        );
    }

}

export default AddBrand