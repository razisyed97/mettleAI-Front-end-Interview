import React, {Component} from 'react';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CakeIcon from '@material-ui/icons/Cake';
import TranslateIcon from '@material-ui/icons/Translate';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from '@material-ui/icons/Search';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    root : {
        paddingLeft: "0px",
        display: "flex",
        maxHeight: "48px",
        minHeight: "48px",
        "&$expanded": {
            maxHeight: "48px",
            minHeight: "48px",
        }
    },
    content : {
        margin: "0px",
        padding: "0px",
        minHeight: "48px"
    },
    expanded : {
        marginTop: "0px",
    },
    container : {
        margin: "20px 0px 20px 0px",
        borderRadius : "4px"
    }
}

const colours = [
    "#25A575",
    "#2595A5",
    "#3A719B",
    "#254B7A",
    "#142B58"
]

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            autocomplete : [],
            address : "",
            data : {
                firstName : "",
                lastName : "",
                dateOfBirth : "",
                contactLanguage : "",
                phone : "",
                email : "",
                address : "",
                notesReason : ""
            }
        }
    }


    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.formData !== prevState.data){
          return { data: nextProps.formData, address : nextProps.formData.address};
       }
       else return null;
    }


    handleChange = address => {
        var temp = {}
        temp.target = {}
        temp.target.placeholder = "Address"
        temp.target.value = address

        this.updateData(temp)

        this.setState({ address : address});
    };
    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };


    updateData(e){
        var field = e.target.placeholder.replace(/\s/g, '')
        var newData = e.target.value
        var data = this.state.data
        const possibilities = ["FirstName", "LastName", "DateofBirth", "ContactLanguage", "Phone", "Email", "Address", "Notes/Reason"]
        //console.log(field)
        console.log(data)
        if (possibilities.includes(field)){
            for (let [key, value] of Object.entries(data)) {
                if (key.toLowerCase() == field.toLowerCase()){
                    console.log("hi")
                    console.log(newData)
                    data[key] = newData
                }
                if (field.toLowerCase() == "notes/reason"){
                    data.notesReason = newData
                }
            }
        }
        //this.setState({data : data})
        console.log(data)
        this.props.updateForms(data, this.props.colour)
    }

    render(){
        const { classes } = this.props;
        return(
            <ExpansionPanel
            square={false}
            className={classes.container}
            defaultExpanded={true}
            >
                <ExpansionPanelSummary
                 expandIcon={<ExpandMoreIcon />}
                 aria-controls="panel1a-content"
                 classes={{root : classes.root, content : classes.content, expanded : classes.expanded}}
                >
                    <div className="panelcard-icon" style={{background : colours[this.props.colour]}}>
                        {this.props.colour + 1}
                    </div>
                    <div className="panelcard-name">{this.props.formData.firstName ? this.props.formData.firstName : "New Referral"}</div>
                    <div className="panelcard-filler"></div>
                    <div className="panelcard-trash">
                        <IconButton 
                            aria-label="delete" 
                            colour={this.props.colour}
                            onClick={() => this.props.delete(this.props.colour)}
                            onFocus={(event) => event.stopPropagation()}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form 
                    className="panelcard-form"
                    >
                        <div className="panelcard-textfield-lg">
                            <div className="panelcard-textfield-sm">
                                <TextField
                                color="primary"
                                required
                                value={this.props.formData.firstName}
                                label="required"
                                placeholder="First Name"
                                fullWidth
                                onChange={(e) => this.updateData(e)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                            </div>
                            <div className="panelcard-textfield-sm">
                                <TextField
                                value={this.props.formData.lastName}
                                required
                                label="required"
                                placeholder="Last Name"
                                fullWidth
                                onChange={(e) => this.updateData(e)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                            </div>
                        </div>
                        <div className="panelcard-textfield-lg">
                            <div className="panelcard-textfield-sm">
                                <TextField
                                value={this.props.formData.dateOfBirth}
                                required
                                label="required"
                                placeholder="Date of Birth"
                                fullWidth
                                onChange={(e) => this.updateData(e)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <CakeIcon />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                            </div>
                            <div className="panelcard-textfield-sm">
                                <TextField
                                value={this.props.formData.contactLanguage}
                                required
                                label="required"
                                id="standard-required"
                                placeholder="Contact Language"
                                fullWidth
                                onChange={(e) => this.updateData(e)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <TranslateIcon />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                            </div>
                        </div>
                        <div className="panelcard-textfield-lg">
                            <div className="panelcard-textfield-sm">
                                <TextField
                                value={this.props.formData.phone}
                                required
                                label="required"
                                id="standard-required"
                                placeholder="Phone"
                                fullWidth
                                onChange={(e) => this.updateData(e)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                            </div>
                            <div className="panelcard-textfield-sm">
                                <TextField
                                value={this.props.formData.email}
                                required
                                label="required"
                                id="standard-required"
                                placeholder="Email"
                                fullWidth
                                onChange={(e) => this.updateData(e)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                    ),
                                }}
                                />
                            </div>
                        </div>
                        <div className="panelcard-textfield-lg">
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div style={{width : "100%", height : "0px"}}>
                                <TextField
                                label="required"
                                required
                                value={this.state.address ? this.state.address : this.props.formData.address}
                                id="standard-required"
                                autoComplete="off"
                                onChange={(e) => this.updateData(e)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                    ),
                                }}
                                placeholder="Address"
                                fullWidth
                                {...getInputProps({
                                    className: 'location-search-input',
                                })}
                                />
                                <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';

                                    const style = suggestion.active
                                    ? { background: '#DFEDF0', cursor: 'pointer' }
                                    : { background: 'white', cursor: 'pointer' };
                                    return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>
                        </div> 
                        <div className="panelcard-textfield-lg">
                            <TextField
                            value={this.props.formData.notesReason}
                            id="standard-textarea"
                            placeholder="Notes/Reason"
                            fullWidth
                            onChange={(e) => this.updateData(e)}
                            />

                        </div>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}


export default withStyles(styles)(Card);