import React, { useState } from "react";
import Form from "./Form";

export default function FormManager() {
  const [formData, setFormData] = useState([
    {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      contactLanguage: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
  ]);

  const addForm = (
    firstName,
    lastName,
    dateOfBirth,
    contactLanguage,
    phone,
    email,
    address,
    notes
  ) => {
    if (formData.length < 5) {
      const newForm = [
        ...formData,
        {
          firstName,
          lastName,
          dateOfBirth,
          contactLanguage,
          phone,
          email,
          address,
          notes,
        },
      ];
      setFormData(newForm);
    }
  };

  return (
    <div>
      <Form addForm={addForm} />
    </div>
  );
}
