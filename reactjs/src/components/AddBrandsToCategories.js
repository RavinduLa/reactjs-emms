import React from "react";
import {Col, Form} from "react-bootstrap";
import axios from "axios";

class AddBrandsToCategories extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show = false
        this.state = {
            brandList : [],
            categoryList: []
        }
        this.submitCombo.bind(this)
        this.categoryChange.bind(this)
        this.brandChange.bind(this)

    }

    initialState = {
        brand:'',
        categoryName:'',
        brandList:[],
        categoryList: []
    }
    componentDidMount() {
        const URL_LOCALHOST_BRANDS = "http://localhost:8080/api/allBrands"
        const URL_LOCALHOST_CATEGORIES = "http://localhost:8080/api/allCategories"
        axios.get(URL_LOCALHOST_BRANDS)
            .then( response => response.data)
            .then( (data) => {
                this.setState({brandList: data})
                this.setState( {brand: data[0].brandName})
            }).catch(error => {
                alert(error)
        })

        axios.get(URL_LOCALHOST_CATEGORIES)
            .then( response => response.data)
            .then( (data) => {
                this.setState({categoryList: data})
                this.setState( {categoryName: data[0].categoryName})
            }).catch(error => {
            alert(error)
        })
    }

    submitCombo = (event) => {
        event.preventDefault()



    }

    categoryChange = (event) => {
        //event.preventDefault()
        this.setState({category: event.target.value})
    }

    brandChange = (event) => {
        //event.preventDefault()
        this.setState({brand: event.target.value})
    }
    render() {
        return (
            <div>


                <Form onSubmit={this.submitCombo.bind(this)}>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                required
                                as={'select'}
                                value={this.state.category}
                                onChange={this.categoryChange.bind(this)}>

                                {
                                    this.state.brandList.length === 0?
                                        <option>No categories registered</option>:
                                        this.state.categoryList.map( (e) => (
                                            <option value={e.categoryName} datatype={'text'}>
                                                {e.categoryName}
                                            </option>
                                        ))
                                }


                            </Form.Control>


                        </Form.Group>



                        <Form.Group as={Col}>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                required
                                as={'select'}
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
                    </Form.Row>

                </Form>
            </div>
        );
    }

}

export default AddBrandsToCategories