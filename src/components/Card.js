import React, {Component} from 'react';

import "./Card.css"

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


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CakeIcon from '@material-ui/icons/Cake';
import TranslateIcon from '@material-ui/icons/Translate';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from '@material-ui/icons/Search';

import { withStyles } from '@material-ui/core/styles';

// MUI styling
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
        borderRadius : "4px",
        width: "fit-content"
    }
}

// Colour Palette
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
                notesReason : "",
            },
            expanded : this.props.address
        }
    }

    // Alternative to Componentwillreceieveprops to fix a
    // bug with receiving updated props
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.formData !== prevState.data){
          return { data: nextProps.formData, address : nextProps.formData.address, expanded : nextProps.expanded };
       }
       else return null;
    }

    // React Autocomplete Component
    handleChange = address => {
        var temp = {}
        temp.target = {}
        temp.target.placeholder = "Address"
        temp.target.value = address

        this.updateData(temp)
        this.setState({ address : address});
    };

    // React Autocomplete Component
    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };


    updateData(e){
        // To update the state of Card component and then pass data to parent Referral component
        var field = e.target.placeholder.replace(/\s/g, '')
        var newData = e.target.value
        var data = this.state.data
        const possibilities = ["FirstName", "LastName", "DateofBirth", "ContactLanguage", "Phone", "Email", "Address", "Notes/Reason"]

        // Simple field validation check
        if (possibilities.includes(field)){
            for (let [key] of Object.entries(data)) {
                if (key.toLowerCase() === field.toLowerCase()){
                    data[key] = newData
                } 
                // To account for / in string
                if (field.toLowerCase() === "notes/reason"){
                    data.notesReason = newData
                } 
            }
        }
        // Pass data to callback from Referral parent component
        //
        // this.props.colour represents the numbering and colour of 
        // the forms, which also represent the index of the form in 
        // Referral's state, so it is necessary to pass it in to the callback
        //
        // this.state.expanded represent if the form is expanded or not
        this.props.updateForms(data, this.props.colour, this.state.expanded)
    }

    onExpandChange = (event, expanded) => {
        // To account for the coloured square representing form order's borderRadius on expansion
        this.setState({expanded : expanded})
        if (expanded === true){
            document.getElementsByClassName("panelcard-icon")[this.props.colour].style.borderBottomLeftRadius = "0px";
        }
        else{
            document.getElementsByClassName("panelcard-icon")[this.props.colour].style.borderBottomLeftRadius = "4px";
        }
      }

    autocomplete = (e) => {
        // To update address values from the React Autocomplete component to Referral parent component
        // since the Autocomplete component's behaviour was different with the MUI textfield.
        // it just formats the data and then calls this.updateData()
        e.target.placeholder = "Address"
        e.target.value = e.target.textContent
        this.updateData(e) 
    }

    render(){
        // Deconstruct classes to use MUI classes
        const { classes } = this.props; 
        return(
            <ExpansionPanel
            square={false}
            className={classes.container}
            defaultExpanded={this.props.expanded}
            onChange={this.onExpandChange}
            >
                <ExpansionPanelSummary
                 expandIcon={<ExpandMoreIcon />}
                 aria-controls="panel1a-content"
                 classes={{root : classes.root, content : classes.content, expanded : classes.expanded}}
                >
                    <div className="panelcard-icon" style={{background : colours[this.props.colour]}}>
                        {this.props.colour + 1}
                    </div>
                    <div className="panelcard-name">{this.props.formData.firstName || this.props.formData.lastName ? this.props.formData.firstName + " " + this.props.formData.lastName : "New Referral"}</div>
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
                            value={this.state.data.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div style={{width : "100%", height : "0px"}}>
                                <TextField
                                label="required"
                                required
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
                                        placeholder="Address" value={suggestion.description} onClick={(e)=> this.autocomplete(e)}
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