import React , {Component} from 'react';
import './Referral.css';

import Card from './Card';

class Referral extends Component {
    constructor(){
        super()
        this.state = {
            formData : [
                {
                    firstName : "",
                    lastName : "",
                    dateOfBirth : "",
                    contactLanguage : "",
                    phone : "",
                    email : "",
                    address : "",
                    notesReason : ""
                }
            ]
        }
        this.updateForms = this.updateForms.bind(this);
    }
    addForm(){
        if (this.state.formData.length < 5){
            var array = this.state.formData
            array.push({
                firstName : "",
                lastName : "",
                dateOfBirth : "",
                contactLanguage : "",
                phone : "",
                email : "",
                address : "",
                notesReason : ""
            })
            this.setState(prevState => ({
                formData:  array
              }));
        }
        console.log(this.state.formData)
    }

    delete = (index) => {
        this.setState((prevState) => (
            {
            formData : this.removeIndex(prevState.formData, index)
          }));
        console.log(this.state.formData)
    }
    
    removeIndex(arr, index){
        arr.splice(index, 1)
        return arr
    }
    
    updateForms(data, formNum){
        //console.log(data, formNum)

        let items = [...this.state.formData];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...items[formNum]};
        // 3. Replace the property you're intested in
        console.log(data)
        item = data;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[formNum] = item;


        this.setState((prevState) => ({
            formData : items
        }));
        console.log(this.state.formData)
    }

    render(){
        console.log(this.state.formData)
        return (
            <div className="referral-div">
                <div className="referral-title">
                    <h3>Referral Patients</h3>
                    <h4>You can add up to five patients at a time</h4>
                </div>
                <div className="referral-forms">
                   {this.state.formData.map((data, index) => {
                        console.log(data)
                        return (
                            <Card 
                            key={index} 
                            formData={data}
                            colour={index}
                            delete={this.delete}
                            updateForms={this.updateForms}
                            ></Card>
                        )
                   })}
                </div>
                <div className="add-button" onClick={() => this.addForm()}>
                    + Add Another Patient
                </div>
                <div className="send-button">
                    Send Referrals
                </div>
            </div>
        )
    }
}
  

export default Referral;
