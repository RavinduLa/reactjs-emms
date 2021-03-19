import React from "react";
import {Link} from "react-router-dom";

class Suppliers extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Link to={'/addSupplier'}>Add new Suppliers</Link>  <br/>
                <Link to={'/supplierList'}>View Suppliers</Link>  <br/>
            </div>
        );
    }

}

export default Suppliers