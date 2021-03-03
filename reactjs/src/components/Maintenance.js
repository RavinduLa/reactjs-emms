import React from "react";
import {Link} from "react-router-dom";

class Maintenance extends React.Component{


    render() {
        return(
            <div>
                <Link to={"/addNewJob"}>Add new Job</Link>
            </div>
        )
    }
}

export default Maintenance;