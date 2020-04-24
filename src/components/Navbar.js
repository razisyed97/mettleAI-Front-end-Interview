import React , {Component} from 'react';
import './Navbar.css'

class Navbar extends Component{
    render(){
        return(
            <div className="navbar-div">
                <div className="navbar-content">
                    <h2>Patient Referral Form</h2>
                    <h3>Hayes Valley Health San Francisco</h3>
                </div>
            </div>
        )
    }
}

export default Navbar