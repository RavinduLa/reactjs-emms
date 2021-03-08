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
                <Link to={'/equipmentConfiguration'}>Equipment Configurations</Link>
                <Link to={'/addEquipmentCategory'}>Add Categories</Link>
            </div>
        );
    }
}
export default Admin