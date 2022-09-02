import React, {Component} from "react";
import { connect } from "react-redux";

class PastTrips extends Component{

    render(){
        <h2>Past Trips</h2>
    }
}

const mapStateToProps = (state) =>{
    return state;
}

export default connect(mapStateToProps)(PastTrips);