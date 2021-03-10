import React from "react";
import Toast1 from "./Toast1";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";

class AddModels extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show = false
        this.state.nameWarningShow = false
        this.state = {
            brandList : []
        }

        this.submitModel.bind(this)
        this.modelChange.bind(this)
        this.brandChange.bind(this)

    }

    initialState = {
        modelId:'',
        model:'',
        brand: '',

        brandList: []
    }

    componentDidMount() {
        const LOCAL_HOST_URL = "http://localhost:8080/api/allBrands";
        axios.get(LOCAL_HOST_URL)
            .then(response => response.data)
            .then((data) => {
                this.setState({brandList: data})
                this.setState({brand: data[0].brandName })
            }).catch(error => {
                alert(error)
        })
    }

    submitModel = (event) => {

        event.preventDefault();

        const URLLocalHost = "http://localhost:8080/api/addModel";

        const model = {
            model: this.state.model,
            brand: this.state.brand
        }

        console.log("Model details" + model.modelId+ model.model)
        axios.post(URLLocalHost, model)
            .then(response => {
                if (response.data != null){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                }
                else {
                    this.setState({"show" : false})
                }
            }).catch(reject => {
                alert(reject)
        })
        this.resetModel()


    }



    resetModel = () => {
        this.setState( () => this.initialState);
        const LOCAL_HOST_URL = "http://localhost:8080/api/allBrands";
        axios.get(LOCAL_HOST_URL)
            .then( response => response.data)
            .then((data) => {
                this.setState({brandList: data})
            });

    }

    modelChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });

    }

    brandChange = (event) => {
        this.setState( {brand: event.target.value});

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


                <Form onSubmit={this.submitModel.bind(this)} onReset={this.resetModel.bind(this)}
                id={'modelAddForm'}>
                    <Form.Row>

                        <Form.Group controlId={'formBrandName'}>
                            <Form.Label>Brand</Form.Label>

                            <Form.Control
                                as={"select" } required name={'brand'}
                                /*defaultValue={"None"}*/
                                value={this.state.brand}
                                onChange={this.brandChange.bind(this)}>

                                {
                                    this.state.brandList.length === 0?
                                        <option>No brands registered</option>:
                                        this.state.brandList.map( (e) => (
                                            <option value={e.brandName} datatype={'text'}>
                                                {e.brandName}
                                            </option>
                                        ))
                                }


                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId={'formModelName'} as={Col}>
                            <Form.Label>Add Model</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name={'model'}
                                placeholder="Enter Brand"
                                value={this.state.model}

                                onChange={this.modelChange.bind(this)}
                            />

                        </Form.Group>

                    </Form.Row>

                    <Button type={'submit'} className={'btn btn-success'}>Submit</Button>
                    <Button type={'reset'} className={'btn btn-secondary'}>Reset</Button>
                </Form>

            </div>
        );
    }

}

export default AddModels;