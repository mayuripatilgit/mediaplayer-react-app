import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Card, CardContent, Grid, Paper, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
function ResetPasswordForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [dialogMessage, setDialogMessage] = useState('');


  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  //Handling the submit button
  const handleSubmit = () => {
    let errors = {};



    if (!email) {
      errors['emailError'] = "Please Enter Valid Email"
    }

    if (!password) {
      errors['passwordError'] = "Password  minimum length should be 8"
    }
    if (!newPassword) {
      errors['passwordError'] = "Password  minimum length should be 8"
    }


    setFormErrors(errors);

    const noErrors = Object.keys(errors).length === 0;


    if (noErrors) {
      const payload = {



        email: email,
        password: password,
        newPassword: newPassword



      }
      //  call the api to save the vitals
      axios
        .put(`http://localhost:8081/api/resetpassword?email=${email}&password=${password}&newPassword=${newPassword}`, payload)
        .then(resp => {
          setUsers(resp.data);
          const obj = {

            email: resp.data.email,
             password: resp.data.password,
             newPassword: resp.data.newPassword,
          }

          setDialogMessage(": " + resp.data.id)
          setDialogOpen(true);
          localStorage.setItem("mytoken", JSON.stringify(obj));
          // alert("Password reset sucessfully");
          toast.error('ResetPassword sucessfully');

          setMessage(errors.reponse.data);
        })
        .catch(error => {
          // handle error
          toast.error('Resetpassword failed');

          setMessage(error.reponse.data);

          // setMsg(error.response.data);

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
    //  <Container maxWidth="sm" style={{display:'flex',justifyContent:"center",alignItems:"center",height:"100vh"}}>
    <Card style={{
      marginLeft: '30%', marginRight: '30%', marginTop: '10%',
      boxShadow: '0px 0px 10px rgba(0,0,0,1)'
    }}>
      <CardContent>
        <Typography variant="h5" gutterBottom style={{marginLeft:'35%'}}>ResetPassword</Typography>
        <form onSubmit={handleSubmit} style={{marginLeft:'30%'}}>
          <TextField

            label="Enter Email"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
            required
            error={!!formErrors.emailError}
            helperText={formErrors.emailError}
            margin="normal" /><br></br>
          <TextField
            label="Old Password"
            value={password}
            type="password"
            margin="normal"
            onChange={(event) => setPassword(event.target.value)}
            required
            error={!!formErrors.passwordError}
            helperText={formErrors.passwordError}
          ></TextField><br></br>
          <TextField
            label="New Password"
            value={newPassword}
            type="password"
            margin="normal"
            onChange={(event) => setNewPassword(event.target.value)}
            required
            error={!!formErrors.passwordError}
            helperText={formErrors.newPasswordError}
          ></TextField><br></br>

          <Button onClick={handleSubmit} variant="contained" style={{marginTop:'2%'}} color="primary">Submit</Button>
          <Button type="button" href="/"style={{marginLeft:'5%',marginTop:'2%'}} variant="contained" color="secondary">Cancel</Button>


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
        {/* </Container>   */}
      </CardContent>
    </Card>
  );

}
export default ResetPasswordForm;