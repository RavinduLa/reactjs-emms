import React from "react";
import axios from "axios";
import Toast1 from "./Toast1";
import {Button, Table} from "react-bootstrap";

class ModelList extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show=  false

        this.state= {
            models: []
        }

        this.deleteModel.bind(this)

    }

    initialState = {
        models: []
    }

    componentDidMount() {
        const URL_LOCALHOST = "http://localhost:8080/api/allModels";

        axios.get(URL_LOCALHOST)
            .then(response => response.data)
            .then( (data) => {
                this.setState( {models: data})
            })
    }

    deleteModel = (modelId) => {
        const DELETE_LOCALHOST_URL = "http://localhost:8080/api/deleteModelById/";

        axios.delete(DELETE_LOCALHOST_URL+modelId)
            .then( response => {
                if(response.data != null){
                    this.setState({"shoe":true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                    this.setState({
                        models: this.state.models.filter(models => models.modelId !== modelId)
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.show,
                            message:"Model Deleted successfully",
                            type: 'danger'}}/>
                </div>


                <Table striped bordered hover variant='light'>
                    <thead>
                        <tr>
                            <th>Model Id</th>
                            <th>Model Name</th>
                            <th>Associated brand</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.models.length === 0?
                            <tr align='center'>
                                <td colSpan={6}> {this.state.models.length} records available </td>
                            </tr> :
                            this.state.models.map( (e) => (
                                <tr key={e.modelId}>
                                    <td>{e.modelId}</td>
                                    <td>{e.model}</td>
                                    <td>{e.brand}</td>

                                    <td>
                                        <Button className={'btn btn-danger'} onClick={this.deleteModel.bind(this,e.modelId)}>
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

export default ModelList;