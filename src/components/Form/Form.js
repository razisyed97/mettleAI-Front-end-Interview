import React, { useState, useRef } from "react";
import AddressLookup from "./AddressLookup";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Container from "@material-ui/core/Container";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CakeIcon from "@material-ui/icons/Cake";
import TranslateIcon from "@material-ui/icons/Translate";
import PhoneIcon from "@material-ui/icons/Phone";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fab from "@material-ui/core/Fab";
import "./Form.css";

const useStyles = makeStyles((theme) => ({
  root: { width: "100%" },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form(props) {
  const { index, savePatient, deletePatient, patient } = props;

  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactLanguage, setContactLanguage] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [expanded, setExpanded] = useState("panel1");

  const handleSave = () => {
    // Error handling
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !contactLanguage ||
      !phone ||
      !email ||
      !address
    ) {
      alert("Please fill out all fields");
      return;
    }
    savePatient(
      index,
      firstName,
      lastName,
      dateOfBirth,
      contactLanguage,
      phone,
      email,
      address,
      notes
    );
    setExpanded(false);
  };

  // Sets patient address. Function called in address
  // lookup component via prop
  const updateAddress = (address) => {
    setAddress(address);
  };

  // Material UI Expansion panel control -
  // ensures panel is expanded upon page load
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {/* <div className="index-background">{index + 1}</div>
            <div className="referral-title">
              {" "}
              {patient.firstName && patient.lastName
                ? `${patient.firstName} ${patient.lastName}`
                : "New Referral Patient"}{" "}
            </div> */}
            {/* <IconButton
              aria-label="delete"
              className={classes.margin}
              size="small"
              onClick={() => deletePatient(index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>*/}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <form className={classes.form} noValidate>
                <div>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange={(event) => setFirstName(event.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle style={{ fill: "lightgrey" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        onChange={(event) => setLastName(event.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle style={{ fill: "lightgrey" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="dateofbirth"
                        required
                        fullWidth
                        id="dateofbirth"
                        label="Date of Birth"
                        onChange={(event) => setDateOfBirth(event.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CakeIcon style={{ fill: "lightgrey" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="contactLanguage"
                        label="Contact Language"
                        name="contactlanguage"
                        onChange={(event) =>
                          setContactLanguage(event.target.value)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TranslateIcon style={{ fill: "lightgrey" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="phone"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        onChange={(event) => setPhone(event.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon style={{ fill: "lightgrey" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon style={{ fill: "lightgrey" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AddressLookup updateAddress={updateAddress} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="notes"
                        label="Notes/Reason"
                        type="notes"
                        id="notes"
                        onChange={(event) => setNotes(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        className={classes.margin}
                        onClick={() => handleSave(index)}
                      >
                        Save
                      </Fab>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        className={classes.margin}
                        onClick={() => deletePatient(index)}
                      >
                        Delete
                      </Fab>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </Container>
  );
}
