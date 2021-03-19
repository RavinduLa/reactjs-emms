import React from "react";
import axios from "axios";
import Toast1 from "./Toast1";
import {Button, Table} from "react-bootstrap";

class BrandList extends React.Component{

    constructor(props) {
        super(props);

        this.state = this.initialState
        this.state.show=  false
        this.state={
            brands: [],
        }
    }

    initialState ={
        brands: []
    }

    componentDidMount() {

        const URL_LOCALHOST = "http://localhost:8080/api/allBrands";
        const URL_VIEW_ALL_BRANDS = global.con + "/api/allBrands"

        axios.get(URL_LOCALHOST)
            .then(response => response.data)
            .then( (data) => {
                this.setState( {brands : data})
            }).catch(error => {
                alert("Error: cannot view brand list\n" + error+ "\nThe backend server might be down.")
        })
    }

    deleteBrand= (brandId) => {
        const DELETE_LOCALHOST_URL = "http://localhost:8080/api/deleteBrand/";
        const DELETE_BRAND = global.con + "/api/deleteBrand/";

        axios.delete(DELETE_BRAND+brandId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show" : false}),3000)

                    this.setState(
                        {brands: this.state.brands.filter(brands =>brands.brandId !==brandId)
                        })
                }
            }).catch(error => {
                alert("Could not delete brand"+error+"The backend server might be down.")
        });
    }

    render() {
        return (
            <div>
                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.show,
                            message:"Brand deleted successfully",
                            type: 'danger'}}/>
                </div>

                <Table striped bordered hover variant='light'>
                    <thead>
                        <tr>
                            <th>Brand Id</th>
                            <th>Brand Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.brands.length === 0?
                            <tr align='center'>
                                <td colSpan={6}> {this.state.brands.length} records available </td>
                            </tr>:
                            this.state.brands.map((e) => (
                                <tr key={e.brandId}>
                                    <td>{e.brandId}</td>
                                    <td>{e.brandName}</td>

                                    <td>
                                        <Button
                                            onClick={this.deleteBrand.bind(this,e.brandId)}
                                            className={'btn btn-danger'}>Delete</Button>
                                    </td>
                                </tr>

                            )
                            )
                    }
                    </tbody>
                </Table>

            </div>
        );
    }

}

export default BrandList;