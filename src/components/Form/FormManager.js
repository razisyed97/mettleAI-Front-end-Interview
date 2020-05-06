import React, { useState } from "react";
import Form from "./Form";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import "./FormCollection.css";

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

export default function FormManager() {
  const classes = useStyles();

  // New patient object holder
  const newPatient = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    contactLanguage: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  };

  const [patients, setPatients] = useState([newPatient]);

  // Initialize patient
  // Add patient ref form if less than five
  const initPatient = () => {
    patients.length < 5 && setPatients([...patients, newPatient]);
  };

  // Saves patient object to new patient array
  const savePatient = (
    index,
    firstName,
    lastName,
    dateOfBirth,
    contactLanguage,
    phone,
    email,
    address,
    notes
  ) => {
    const allPatients = [...patients];
    allPatients[index] = {
      firstName,
      lastName,
      dateOfBirth,
      contactLanguage,
      phone,
      email,
      address,
      notes,
    };
    setPatients(allPatients);
  };

  // Removes patient from new patient array
  const deletePatient = (index) => {
    const allPatient = [...patients];
    allPatient.splice(index, 1);
    setPatients(allPatient);
  };

  return (
    <div>
      <container>
        <p className="ref-heading">Referral Patient</p>
        <p className="sub-ref-heading">
          You can add up to 5 patients at a time
        </p>
      </container>
      {patients.map((patient, index) => (
        <Form
          key={index}
          index={index}
          savePatient={savePatient}
          deletePatient={deletePatient}
          patient={patient}
        />
      ))}
      <button className="add-patient" onClick={() => initPatient()}>
        + ADD ANOTHER PATIENT
      </button>
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
    </div>
  );
}
