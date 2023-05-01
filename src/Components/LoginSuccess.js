import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button, Grid, Box } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
// import Avatar from 'react-avatar';
import 'react-toastify/dist/ReactToastify.css';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
      height: '100%',

      alignItems: 'center',
      backgroundColor: '#303539',
      backgroundSize: 'cover',

  },
  form: {
    marginTop: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginSuccess() {
  const classes = useStyles();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [msg, setMessage] = useState('');

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors['emailError'] = 'Email is required.';
    }

    if (!password) {
      errors['passwordError'] = 'Password is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        email: email,
        password: password,
      };

      axios
        .post('http://localhost:8081/auth/login', payload)
        .then((resp) => {
          const obj = {
            userId: resp.data.userId,
            email: resp.data.email,
            password: resp.data.password,
          };
          localStorage.setItem('mytoken', JSON.stringify(obj));
          toast.success('Login Success');
          setMessage(resp.data);
          window.location.href = '/';

        })
        .catch((error) => {
          toast.error('Login failed');
          setMessage(error.response.data);
        });
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setFormErrors({ ...formErrors, emailError: '' }); // clear email validation error
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFormErrors({ ...formErrors, passwordError: '' }); // clear password validation error
  };

  return (
    <div className={classes.root}>
    <Card sx={{
      marginLeft: '30%', marginRight: '30%', marginTop: '5%',
      marginBottom: '1%', boxShadow: '0px 0px 10px rgba(0,0,0,1)'
  }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <CardContent>
      <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>

      <Typography variant="h5" style={{ marginTop: "10%" , marginLeft:"40%"}}>Login</Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={formErrors.emailError ? true : false}
            helperText={formErrors.emailError ? formErrors.emailError : null}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}s
            error={formErrors.passwordError ? true : false}
            helperText={formErrors.passwordError ? formErrors.passwordError : null}
          />
        <Button variant="contained" color="primary" style={{ marginTop: '5%' }} onClick={handleSubmit}>Login</Button>
        <Button variant="contained" color="secondary" style={{ marginTop: '5%', marginLeft: "60%" }} href='/'>Cancel </Button>
          <Grid container>
            <Grid item xs style={{marginTop:"5%"}}>
            <Link to="/ForgotPassword">ForgotPassword</Link>/
            <Link to="/ResetPasswordForm">ResetPassword</Link>
            </Grid>
            <Grid item style={{marginTop:"5%"}}>
              <Link to="/Registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        </Box>
      </Container>
     </CardContent>
      </Card>
      </div>
  )

}

export default LoginSuccess;
