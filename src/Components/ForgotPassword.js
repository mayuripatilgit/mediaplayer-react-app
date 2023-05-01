import React, { useEffect, useState } from 'react';
import axios from "axios";
import { TextField, Button, Typography ,Card,CardContent} from '@material-ui/core';
import Login from "./Login";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [values, setValues] = useState({
    userName: "",

  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bool,setBool]=useState(false);
  const [emailError,setEmailError]=useState();
  const [dispError,setDispError]=useState();
  const [dispSuccess,setDispSuccess]=useState();

  const [disSuccess,setDisSuccess]=useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
    const errors = validate(values);
    console.log(values);

      axios
      .post(`http://localhost:8081/auth/sendEmail/${values.userName}`)
      .then((response)=>{
      console.log(response.data);
      setDispSuccess(response.data);
      setDisSuccess(!disSuccess);

      window.location.href = '/MyComponent';


       })
     .catch((err)=>{
      console.log(err)



    })


  };
  useEffect(() => {
   // console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
       console.log(errors);
}}, [errors]);

const handleChange = (event) => {
  const { name, value } = event.target;
  setValues({ ...values, [name]: value });
  setErrors({ ...errors, [name]: '' });

};

  const validate = (values) => {
    let errors = {};
    const nameRegex=/^[a-zA-Z]{3,20}$/;
    if (!values.userName) {
     // errors.userName ="email is required";
     setEmailError("email is required");
    }





    return errors;
  };
  const validateEmail = (email) => {
    // email validation regex
    const re = /\S+@\S+\.\S+/;
    if (!email) {
      //errors.userName=('email is required');
      setEmailError('email is required');
    } else if(!re.test(email)) {
      //errors.userName=('Invalid email format');
      setEmailError('Invalid email format')
    }else{
      //errors.userName=('');
      setEmailError('')
      setBool(true)
    }
    if(bool){
      axios
      .get(`http://localhost:8081/auth/verifyEmail/${email}`)
      .then((response)=>{
       setEmailError(response.data);

       })
     .catch((err)=>{
      console.log(err.message)

    })

    }
  };

  const handleEmailChange = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      userName: (e.target.value)
    }));
    validateEmail(e.target.value);
  };









  return (
    <Card style={{marginLeft:'30%',marginRight:'30%',marginTop:'10%',
    boxShadow: '0px 0px 10px rgba(0,0,0,1)'}}>


    <CardContent >
      <Typography variant="h5" gutterBottom style={{marginLeft:'35%'}}>Forgot Password</Typography>
      <form onSubmit={handleSubmit} style={{marginLeft:'35%'}}>
        <TextField
          label=" Enter Your Email"
          variant="outlined"
          type="email"
          value={values.userName}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          margin="normal"
          required
        /><br></br>
       <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick ={handleSubmit}
          size="large"
        >
          Submit
        </Button>

      </form>
      {
  <Snackbar
  open={disSuccess}
  autoHideDuration={3000}
  onClose={()=>setDisSuccess(!disSuccess)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <MuiAlert elevation={6} variant="filled" onClose={()=>setDisSuccess(!disSuccess)} severity="success">
   {dispSuccess}
  </MuiAlert>
</Snackbar>
}


    </CardContent>
    </Card>
  );
}

export default ForgotPassword;
