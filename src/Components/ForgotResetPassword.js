import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgotResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const validatedata = (key, value) => {


    formErrors[key] = !value;
    //console.log(formErrors[key], value);
    if (key.toLowerCase().includes("email")) formErrors['invalidMail']
      = (value && (!/\S+@\S+\.\S+/.test(value)));
    if (key.toLowerCase().includes("newpassword")) formErrors['invalidnewpassword']
      = (value && (value.length < 8));
    if (key.toLowerCase().includes("confirmpassword")) formErrors['invalidpassword']
      = (value && (value.length < 8));


  }
//Handling the submit button
  const handleSubmit = () => {
    //let errors = {};
    // if (!email) {
    //   errors['emailError'] = "Please Enter Valid Email"
    // }

    // if (!newPassword) {
    //   errors['newPasswordError'] = "Password  minimum length should be 8"
    // }
    // if (!confirmPassword) {
    //   errors['confirmPasswordError'] = "Password  minimum length should be 8"
    // }

   
    let temp = {};

    temp['emailError'] = !email;
    temp['invalidMail'] = (email && (!/\S+@\S+\.\S+/.test(email)));
    temp['newPasswordError'] = !newPassword;
    temp['confirmPasswordError'] = !confirmPassword;

    setFormErrors(temp);

    const noErrors = Object.keys(formErrors).filter(x => formErrors[x] === true).length === 0;
    // debugger;



    if (noErrors) {
      const payload = {



        email: email,
        newPassword: newPassword,
        confirmPassword: confirmPassword



      }
      //  call the api to save the vitals
      axios.put(`http://localhost:8081/api/forgotpassword/resetpassword?email=${email}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`, payload)
        .then(resp => {
          setUser(resp.data);
          const obj = {

            email: resp.data.email,
            newpassword: resp.data.newpassword,
            confirmPassword: resp.data.confirmPassword,
          }


          localStorage.setItem("mytoken", JSON.stringify(obj));

          alert('ResetPassword sucessfully');

          
          //window.location.href = "/signIn";
        })
        .catch(error => {
          // handle error
          toast.error('Resetpassword failed');

          setMessage(error.resp.data);


        });

    }
    else {
      toast.error("form contains Invalid data");
    }


  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card style={{
      marginLeft: '30%', marginRight: '30%', marginTop: '10%',
      boxShadow: '0px 0px 10px rgba(0,0,0,1)'
    }}>


      <CardContent>
        <Typography variant="h5" gutterBottom>Forgot ResetPassword</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter email"
            variant="outlined"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              validatedata("emailError", event.target.value)
            }}


            error={formErrors.emailError || formErrors.invalidMail}

            helperText={formErrors.emailError ? "Email is required" : (formErrors.invalidMail ? "Email is invalid" : "")}

            margin="normal"
            required
          /><br></br>
          <TextField
            label="Enter New Password"
            variant="outlined"
            value={newPassword}
            type="password"
            onChange={(event) => { setNewPassword(event.target.value);
            validatedata("newPasswordError", event.target.value) }}
            error={formErrors.newPasswordError}
            helperText={formErrors.newPasswordError ? "password is required" : (formErrors.invalidpassword ? "Password must have a minimum 8 characters" : "")}

            margin="normal"
            required
          /><br></br>
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(event) => { setConfirmPassword(event.target.value);
            validatedata("ConfirmPasswordError", event.target.value) }}
            error={formErrors.confirmPasswordError}
            helperText={formErrors.confirmPasswordError ? "password is required" : (formErrors.invalidpassword ? "Password must have a minimum 8 characters" : "")}
            margin="normal"
            required
          /><br></br>
          <Button
            type="submit"
            variant="outlined"
            style={{ marginTop: '5%' }}
            onClick={handleSubmit}

          >
            Submit
          </Button>
          <Button variant="outlined" style={{ marginTop: '5%', marginLeft: "5%" }} href='/LoginSuccess'>Login</Button>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>

            <DialogTitle>Success!</DialogTitle>

            <DialogContent>

              <p>Password Reset Sucessfully !!!!!!!!!</p>

            </DialogContent>

            <DialogActions>

              <Button onClick={() => setDialogOpen(false)}>OK</Button>

            </DialogActions>

          </Dialog>
        </form>
         {/* {message && (
        <Typography variant="body1" style={{ marginTop: 16 }}>
          {message}
        </Typography>
      )}  */}

      </CardContent>
    </Card>
  );
}

export default ForgotResetPassword;

