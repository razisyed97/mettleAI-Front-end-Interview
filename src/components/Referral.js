import React , {Component} from 'react';
import './Referral.css';
import Alert from '@material-ui/lab/Alert';
import Card from './Card';

class Referral extends Component {
    constructor(){
        super()
        // All forms get rendered based on the states of Referral (each object 
        // of this.state.formData will render a Card component representing 
        // a form)
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
                    notesReason : "",
                    expanded : true
                }
            ],
            alert : {
                num : 0,
                success : "error"
            }
        }
        this.updateForms = this.updateForms.bind(this);
    }

    addForm(){
        // To add another form by adding an empty form template 
        // as a javascript object in this.state.formData
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
                notesReason : "",
                expanded : true
            });
            this.setState({formData : array});
        }
    }

    delete = (index) => {
        // To delete a form by removing a javascript object by its index from 
        // this.state.formData 
        this.setState((prevState) => ({
            formData : this.removeIndex(prevState.formData, index)
          }));
    }
    
    removeIndex(arr, index){
        // Helper function for delete function
        arr.splice(index, 1)
        return arr
    }
    
    updateForms(data, formNum, expanded){
        // To update Referral state everytime a form's data gets updated
        data.expanded = expanded
        let items = [...this.state.formData];
        let item = {...items[formNum]};
        item = data;
        items[formNum] = item;
        
        this.setState({
            formData : items
        });
    }

    submitData(){

        var data = this.state.formData
        var valid = true

        // Check client side data before sending request
        // More detailed checks about data can also be done here. eg: check if date is valid
        for (var index = 0; index < data.length; index++) { 
            if (data[index].firstName === ""){
                valid = false
            }else if (data[index].lastName === "") {
                valid = false
            }else if (data[index].dateOfBirth === "") {
                valid = false
            }else if (data[index].contactLanguage === "") {
                valid = false
            }else if (data[index].phone === "") {
                valid = false
            }else if (data[index].email === "") {
                valid = false
            }else if (data[index].address === "") {
                valid = false
            }               
        } 

        //  POST Request at /api/referrals

        //  if (valid == true){
        //     const url = "/api/referrals"
        //     const options = {
        //         method: 'POST',
        //         headers: {
        //         'Content-type': 'application/json'
        //         },
        //         body: data
        //     }
            
        //     fetch(url, options)
        //     .then((response) => {
        //     // handle successful form upload
        //     })
        //     .catch(err => {
        //     // handle unsuccessful form upload
        //     })
        //  }
        

        // For demo purposes
        console.log(this.state.formData)
        if (valid){
            this.setState({ formData : [] })
        }

        this.setState({alert : {
            num : data.length,
            success : valid ? "success" : "error"
        }})
        document.getElementsByClassName("success-alert")[0].style.display = "block";
    }

    render(){
        return (
            <div className="referral-div">
                <div className="success-alert" style={{display : "none"}}>
                    <Alert severity={this.state.alert.success} >{this.state.alert.success === "success" ? `Success! You have submitted ${this.state.alert.num} pending referral(s). You will be notified once they've been approved`: "Error, you have not filled out all required fields"}</Alert>
                </div>
                <div className="referral-title">
                    <h3>Referral Patients</h3>
                    <h4>You can add up to five patients at a time</h4>
                </div>
                <div className="referral-forms">
                   {this.state.formData.map((data, index) => {
                        return (
                            <Card 
                            key={index} 
                            formData={data}
                            colour={index}
                            delete={this.delete}
                            updateForms={this.updateForms}
                            expanded={data.expanded}
                            />
                        )
                   })}
                </div>
                <div className="add-button" onClick={() => this.addForm()}>
                    + Add Another Patient
                </div>
                <div className="send-button" onClick={() => this.submitData()}>
                    Send Referrals
                </div>
            </div>
        )
    }
}

export default Referral;
