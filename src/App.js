import React, { useState, useEffect, useRef } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './App.css';

function DatePicker({ selectedDate, onChange }) {
  return (
    <input
      type="date"
      id="dob"
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [form, setForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar function
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setForm(false);
        document.body.style.backgroundColor = ""; // Reset background color
      }
    };

    if (form) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [form]);

  const handleClick = () => {
    if (!form) {
      setForm(true);
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Darken background
    }
  };

  const handleDateChange = (date) => {
    setDob(date);
    console.log('Date of Birth:', date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === '' || email.trim() === '' || number.trim() === '' || dob.trim() === '') {
      enqueueSnackbar('Please fill out all fields', { variant: 'warning' });
      return;
    } 
    
    if (!email.includes('@')) {
      enqueueSnackbar(`Please include an "@" in the email address. "${email}" is missing an "@"`, { variant: 'warning' });
      return;
    }

    if (number.trim().length !== 10 || isNaN(number)) {
      enqueueSnackbar('Invalid phone number. Please enter a 10-digit phone number.', { variant: 'warning' });
      return;
    }
    
    // If all validations pass, you can proceed with form submission or any other action
    console.log('Form submitted:', { username, email, number, dob });
    enqueueSnackbar('Form submitted successfully!', { variant: 'success' });
    setForm(false); // Close the form after submission
    document.body.style.backgroundColor = ""; // Reset background color
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Update state based on input id
    switch (id) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>User Details Model</h1>
      <button onClick={handleClick} disabled={form}>Open Form</button>
      {form && 
        <div className="modal" ref={modalRef}>
          <div className="modal-content" style={{height: "500px", width: "400px", backgroundColor: "white" , borderRadius: "5px" }}>
            <form onSubmit={handleSubmit} className="centered-form">
              <h4>Fill Details</h4>
              <h2>Username:</h2>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleInputChange}
              />
              <h2>Email Address:</h2>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleInputChange}
              />
              <h2>Phone Number:</h2>
              <input
                type="text"
                id="phone"
                value={number}
                onChange={handleInputChange}
              />
              <h2>Date of Birth:</h2>
              <DatePicker selectedDate={dob} onChange={handleDateChange} />
              <br/>
              <button className="submit-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

function MyApp() {
  return (
    <SnackbarProvider maxSnack={2}>
      <App />
    </SnackbarProvider>
  );
}

export default MyApp;
