
import React, { useState } from "react";
import { TextField, Typography, Grid, Container, Button } from '@mui/material';

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoginSuccess from "./LoginSuccess";
import dayjs from 'dayjs';
import { validateDate } from "@mui/x-date-pickers/internals";
import { CompareArrowsOutlined } from "@material-ui/icons";


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      backgroundColor: '#303539',
      backgroundSize: 'cover',

    },
  }));
function Registration() {


    const date = dayjs().subtract(10, 'years');;

    const navigate = useNavigate();

    const classes = useStyles();

    const [username, setUserName] = useState("");
    const [dateOfBirth, setDateofBirth] = useState("");

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [gender, setGender] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [formErrors, setFormErrors] = useState({});

    const [msg, setMessage] = useState("");
    const validatedata = (key, value) => {


        formErrors[key] = !value;
        //console.log(formErrors[key], value);
        if (key.toLowerCase().includes("email")) formErrors['invalidMail']
            = (value && (!/\S+@\S+\.\S+/.test(value)));
        if (key.toLowerCase().includes("password")) formErrors['invalidpassword']
            = (value && (value.length < 8));


    }

    const handleChange = (event) => {
        const target = event.target;
        if (target.checked) {
            setGender(target.value);
        }

    }
    const handleSubmit = (e, value) => {
        //  e.preventDefault();
        let temp = {};

        temp['firstNameError'] = !firstName;
        temp['lastNameError'] = !lastName;
        temp['userNameError'] = !username;
        temp['emailError'] = !email;
        temp['invalidMail'] = (email && (!/\S+@\S+\.\S+/.test(email)));
        temp['passwordError'] = !password;
        //temp['invalidpassword']=(password && (value.length<8));
        temp['dateOfBirthError'] = !dateOfBirth;


        // console.log(temp);
        setFormErrors(temp);

        const noErrors = Object.keys(temp).filter(x => temp[x] === true).length === 0;
        //debugger;
        if (noErrors) {

            const payload = {
                username: username,
                email: email,
                dateOfBirth: dateOfBirth,
                firstName: firstName,
                lastName: lastName,
                password: password,
                gender: gender,

            }

            axios.post(`http://localhost:8081/api/user/save`, payload).then(resp => {

                const obj = {
                    userId: resp.data.userId,
                    username: resp.data.username,
                    email: resp.data.email,
                    dateOfBirth: resp.data.dateOfBirth,
                    firstName: resp.data.firstName,
                    lastName: resp.data.lastName,
                    password: resp.data.password,
                    gender: resp.data.gender,

                }

                localStorage.setItem('mytoken', JSON.stringify(obj));

                toast.success('registration Success');

                setMessage(resp.data);

                //         // navigate('/');
            })
                .catch((error) => {
                    console.log(error.data);
                    toast.error('register failed');

                    setMessage(error.reponse.data);

                });

        }
        else {
            toast.error("form contains Invalid data");
        }
    }


    return (


        <div className={classes.root}>

        <Card sx={{
            marginLeft: '30%', marginRight: '30%', marginTop: '5%',
            marginBottom: '1%', boxShadow: '0px 0px 10px rgba(0,0,0,1)'
        }}>
            <ToastContainer position="top-center" autoClose={3000} />
            <CardContent>
                <Container maxWidth="sm">
                    <Typography variant="h5" style={{ marginTop: "10%",marginLeft:'30%' }}>Registration Form</Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="UserName" variant="outlined" style={{ marginTop: '5%' }}
                                    value={username}

                                    onChange={(event) => { setUserName(event.target.value); validatedata("userNameError", event.target.value) }}


                                    error={formErrors.userNameError}

                                    helperText={formErrors.userNameError ? "userName is required" : ""}

                                    required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Email" variant="outlined" style={{ marginTop: '5%' }}
                                    value={email}

                                    onChange={(event) => { setEmail(event.target.value); validatedata("emailError", event.target.value) }}


                                    error={formErrors.emailError || formErrors.invalidMail}

                                    helperText={formErrors.emailError ? "Email is required" : (formErrors.invalidMail ? "Email is invalid" : "")}

                                    required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField label="FirstName" variant="outlined"
                                    style={{ marginTop: '5%' }}
                                    value={firstName}
                                    onChange={(event) => { setFirstName(event.target.value); validatedata("firstNameError", event.target.value) }}


                                    error={formErrors.firstNameError}

                                    helperText={formErrors.firstNameError ? "FirstName is required" : ""}
                                    required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="LastName" variant="outlined" style={{ marginTop: '5%' }}
                                    value={lastName}
                                    onChange={(event) => { setLastName(event.target.value); validatedata("lastNameError", event.target.value) }}


                                    error={formErrors.lastNameError}

                                    helperText={formErrors.lastNameError ? "lastName is required" : ""} required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField type='password' label="Password" variant="outlined" style={{ marginTop: '5%' }}
                                    value={password}
                                    onChange={(event) => { setPassword(event.target.value); validatedata("passwordError", event.target.value) }}


                                    error={formErrors.passwordError}

                                    helperText={formErrors.passwordError ? "password is required" : (formErrors.invalidpassword ? "Password must have a minimum 8 characters" : "")}
                                    required />
                            </Grid>
                            <Grid item xs={6}>
                                <FormLabel id="demo-controlled-radio-buttons-group" style={{ marginLeft: '10%', marginTop: '5%' }}>DateOfBirth</FormLabel><br></br>

                                <TextField type='date'
                                style={{  marginTop: '1%' }}
                                    inputProps={{ min: "1960-01-11", max: "2008-01-01" }}
                                    onChange={(event) => { setDateofBirth(event.target.value); validatedata("dateOfBirthError", event.target.value) }}
                                    error={formErrors.dateOfBirthError}

                                    helperText={formErrors.dateOfBirthError ? "DateOfBirth is required" : ""}
                                    required />



                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label" style={{ marginLeft: '5%', marginTop: '2%' }}>Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group">
                                        <FormControlLabel control={<Radio />} label="Female"

                                            name="gender" value="FeMale" id="gender" onChange={handleChange} />
                                        <FormControlLabel control={<Radio />}
                                            name="gender" value="Male" id="gender" onChange={handleChange} label="Male" />


                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Button variant="contained" color="primary" style={{ marginTop: '5%' }} onClick={handleSubmit}>Register</Button>

                        <Button variant="contained" color="secondary" style={{ marginTop: '5%', marginLeft: "45%" }} href='/Home'>Cancel </Button>

                        <h5 align="center" style={{ marginTop: '5%' }}>Already have an account? <Link to="/LoginSuccess">Login</Link>
                        </h5>
                    </form>
                </Container>
            </CardContent>
        </Card>
        </div>

    )
}
export default Registration;