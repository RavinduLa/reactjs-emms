import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";
import Toast1 from "./Toast1";

class AddEquipmentCategory extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false

        this.state={
            categoryName: ''
        }

        this.submitCategory.bind(this)
        this.resetCategory.bind(this)

    }

    componentDidMount() {
        //this.setState(this.initialState)
    }

    initialState = {
        categoryName: '',
    }



    submitCategory = event =>{
        event.preventDefault();
        const URL_LOCALHOST = "http://localhost:8080/api/addCategory";

        const category = {

            categoryName: this.state.categoryName
        }

        console.log("Submit before running post")
        console.log("Category Name: "+ this.state.categoryName)

        axios.post(URL_LOCALHOST,category)
            .then(response => {
                console.log("post in then block")
                if(response.data != null){
                    this.setState({"show": true})
                    setTimeout( () => this.setState( {"show":false}),3000)
                }
                else {
                    this.setState({"show":false})
                }
            }).catch( (error) => {
            alert("rejected: " +error);
        })
        //this.resetCategory();
    }

    resetCategory  = () => {
        this.setState( () => this.initialState)

    }

    categoryChange= event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        const {categoryName} = this.state;
        return (
            <div>

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{
                            show:this.state.show,
                            message:"Category added successfully",
                            type: 'success',
                        }} />
                </div>

                <Form onSubmit={this.submitCategory.bind(this)} onReset={this.resetCategory.bind(this)}
                      id={'addNewCategoryForm'}>
                    <Form.Row>
                        <Form.Group controlId={'formCategoryName'} as={Col}>
                            <Form.Label>Equipment Category</Form.Label>

                            <Form.Control
                                required
                                type="text"
                                name={'categoryName'}
                                plceholder="Enter category"
                                defaultValue={this.state.categoryName}

                                onChange={this.categoryChange}
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

export default AddEquipmentCategory