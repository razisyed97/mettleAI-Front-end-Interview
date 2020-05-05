import React, { useState } from "react";
import AddressLookup from "./AddressLookup";
import axios from "axios";
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
import Fab from "@material-ui/core/Fab";
import "./Form.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactLanguage, setContactLanguage] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  //Handles form onSubmit
  const referralDataHandler = () => {
    // Error handling
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !contactLanguage ||
      !phone ||
      !email ||
      !address ||
      !notes
    ) {
      alert("Please fill out all fields");
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      contactLanguage: contactLanguage,
      phone: phone,
      email: email,
      address: address,
      notes: notes,
    };
    axios.post("/api/referrals", data).then((response) => {
      console.log(response);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <p className="ref-heading">Referral Patient</p>
        <p className="sub-ref-heading">
          You can add up to 5 patients at a time
        </p>
        <form
          className={classes.form}
          noValidate
          onSubmit={referralDataHandler}
        >
          <div className="background-card">
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
                  onChange={(event) => setContactLanguage(event.target.value)}
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
                <AddressLookup
                  onChange={(event) => setAddress(event.target.value)}
                />
                {/* <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  onChange={(event) => setAddress(event.target.value)}
                /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="notes"
                  label="Notes/Reason"
                  type="notes"
                  id="notes"
                  onChange={(event) => setNotes(event.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <button className="add-patient">+ ADD ANOTHER PATIENT</button>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            className={classes.margin}
            type="submit"
          >
            Send Referrals
          </Fab>
        </form>
      </div>
    </Container>
  );
}
