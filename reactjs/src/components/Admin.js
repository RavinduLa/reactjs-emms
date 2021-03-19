import React from "react";
import {Link} from "react-router-dom";

class Admin extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }


    render() {
        return (
            <div>
                <Link to={'/equipmentConfiguration'}>Equipment Configurations</Link> <br/>
                <Link to={'/suppliers'}>Suppliers</Link>  <br/>


                {/*<Link to={'/addEquipmentCategory'}>Add Categories</Link> <br/>
                <Link to={'/addBrandsToCategories'}>Add Brands to Categories</Link>  <br/>
                <Link to={'/viewBrandForCategories'}>View Brands of Categories</Link>  <br/>
                <Link to={'/brands'}>Brands</Link>  <br/>
                <Link to={'/brandsFull'}>Brands Full</Link>  <br/>
                <Link to={'/addModels'}>Add Models</Link>  <br/>
                <Link to={'/modelList'}>Model list</Link>  <br/>
                <Link to={'/ipSettings'}>IP Settings</Link>  <br/>*/}

            </div>
        );
    }
}
export default Admin