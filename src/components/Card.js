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


class Card extends Component{
    constructor(){
        super();
        this.state = {
            autocomplete : [],
            address : ""
        }
    }
 
    handleChange = address => {
        this.setState({ address });
    };
    handleSelect = address => {
    geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };
    test(e){
        e.persist()
        console.log(e.target.value)

        if (e.target.value !== ""){
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
                };
            
            fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=AIzaSyDeosvjuXnbDOLK0qsW-vBgqUoHIcRCkhY`, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
    
            // this.setState((prevState) => ({
            //     autocomplete: [...prevState.autocomplete, e.target.value]
            //   }));
            // console.log(this.state.autocomplete)
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <ExpansionPanel
            square={false}
            className={classes.container}
            >
                <ExpansionPanelSummary
                 expandIcon={<ExpandMoreIcon />}
                 aria-controls="panel1a-content"
                 classes={{root : classes.root, content : classes.content, expanded : classes.expanded}}
                >
                    <div className="panelcard-icon"></div>
                    <div className="panelcard-name">Hello</div>
                    <div className="panelcard-filler"></div>
                    <div className="panelcard-trash">
                        <IconButton 
                            aria-label="delete" 
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form className="panelcard-form">
                        <div className="panelcard-textfield-lg">
                            <div className="panelcard-textfield-sm">
                                <TextField
                                color="primary"
                                required
                                label="required"
                                placeholder="First Name"
                                fullWidth
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
                                required
                                id="standard-required"
                                label="required"
                                placeholder="Last Name"
                                fullWidth
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
                                required
                                label="required"
                                id="standard-required"
                                placeholder="Date of Birth"
                                fullWidth
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
                                required
                                label="required"
                                id="standard-required"
                                placeholder="Contact Language"
                                fullWidth
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
                                required
                                label="required"
                                id="standard-required"
                                placeholder="Phone"
                                fullWidth
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
                                required
                                label="required"
                                id="standard-required"
                                placeholder="Email"
                                fullWidth
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
                                id="standard-required"
                                autocomplete={false}
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
                            {/*
                            <TextField
                            label="required"
                            required
                            id="standard-required"
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                                ),
                            }}
                            placeholder="Address"
                            fullWidth
                        />*/}
                        </div> 
                        <div className="panelcard-textfield-lg">
                        <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={this.state.autocomplete.map((option) => option)}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            id="standard-textarea"
                            placeholder="Notes/Reason"
                            fullWidth
                            onChange={(e) => this.test(e)}
                            InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                        />
                        </div>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}


export default withStyles(styles)(Card);