import React from "react";
import EquipmentCategories from "./EquipmentCategories";
import {Link} from "react-router-dom";

class EquipmentConfiguration extends React.Component{

    render() {
        return (
            <div>
               {/* <EquipmentCategories></EquipmentCategories>*/}
                <Link to={'/equipmentCategoryList'}>Equipment Categories</Link>  <br/>
                <Link to={'/brandList'}>Equipment Brands</Link> <br/>
                <Link to={'/modelList'}>Equipment Models</Link> <br/>
                <Link to={'/viewBrandForCategories'}>Category and Brands</Link> <br/>
            </div>
        );
    }
}

export default EquipmentConfiguration