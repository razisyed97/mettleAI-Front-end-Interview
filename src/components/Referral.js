import React , {Component} from 'react';
import './Referral.css';

import Card from './Card';

class Referral extends Component {
    constructor(){
        super()
        this.state = {
            
        }
    }

    render(){
        return (
            <div className="referral-div">
                <div className="referral-title">
                    <h3>Referral Patients</h3>
                    <h4>You can add up to five patients at a time</h4>
                </div>
                <div className="referral-forms">
                   <Card

                   />
                   <Card
                    
                    />
                    <Card
                    
                    />
                </div>
            </div>
        )
    }
}
  

export default Referral;
