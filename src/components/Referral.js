import React , {Component} from 'react';
import './Referral.css'

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
    }
}

class Referral extends Component {

    render(){
        const { classes } = this.props;

        return (
            <div className="referral-div">
                <div className="referral-title">
                    <h3>Referral Patients</h3>
                    <h4>You can add up to five patients at a time</h4>
                </div>
                <div className="referral-forms">
                    <ExpansionPanel
                    square={false}
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
                                        placeholder="Phone"
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
                                        label="required"
                                        id="standard-required"
                                        placeholder="Email"
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
                                    <TextField
                                    label="required"
                                    required
                                    id="standard-required"
                                    placeholder="Address"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                        ),
                                    }}
                                    />
                                </div> <div className="panelcard-textfield-lg">
                                    <TextField
                                    id="standard-textarea"
                                    placeholder="Notes/Reason"
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
                            </form>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        )
    }
}
  

export default withStyles(styles)(Referral);
