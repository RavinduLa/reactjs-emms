import React from "react";
import Toast1 from "./Toast1";
import {Button, Table} from "react-bootstrap";
import axios from "axios";

class EquipmentCategoryList extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show=  false
        this.state={
            categories: []
        }
    }

    initialState = {

        categories : []
    }

    componentDidMount() {
        const URL_LOCALHOST = "http://localhost:8080/api/allCategories";

        axios.get(URL_LOCALHOST)
            .then(response => response.data)
            .then((data) => {
                this.setState({categories: data})
            });
    }

    loadCategories = event =>{
        event.preventDefault()
        const URL_LOCALHOST = "http://localhost:8080/api/allCategories";

        axios.get(URL_LOCALHOST)
            .then(response => response.data)
            .then((data) => {
                this.setState({categories: data})
            })
    }

    deleteCategory = (categoryId) =>{

        const URL_LOCALHOST = "http://localhost:8080/api/deleteCategoryById/"

        axios.delete(URL_LOCALHOST+categoryId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                    //categories: this.state.categories.filter(categories => categories.categoryId !== categoryId)
                    this.setState({
                        categories: this.state.categories.filter(categories => categories.categoryName!== categoryId)
                    })
                }
            })
    }
    //categoryId;




    render() {
        return (
            <div>

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.show,
                            message:"Category deleted successfully",
                            type: 'danger'}}/>
                </div>

                <Button onClick={this.loadCategories}>Load Categories</Button>


                <Table striped bordered hover variant='light'>

                    <thead>
                        <tr>
                            <th>Equipment Categories</th>
                        </tr>
                    </thead>

                    <tbody>
                    {this.state.categories.length === 0 ?
                        <tr align='center'>
                            <td colSpan={6}> {this.state.categories.length} categories available</td>
                        </tr>:
                        this.state.categories.map( (c) => (
                            <tr key={c.categoryId}>
                                <td>{c.categoryName}</td>

                                <td>
                                    <Button
                                        onClick={this.deleteCategory.bind(this,c.categoryId)}
                                        className={'btn btn-danger'}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>

                </Table>

            </div>
        );
    }

}

export default EquipmentCategoryList;