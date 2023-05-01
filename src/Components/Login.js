import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    root: {
      width: '100%',
      height: '100%',

      alignItems: 'center',
      backgroundColor: '#303539',
      backgroundSize: 'cover',

    },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [msg, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    let errors = {};

    if (!email) {
      errors['userNameError'] = 'User name is required.';
    }

    if (!password) {
      errors['passwordError'] = 'Password is required.';
    }

    setFormErrors(errors);
    const noErrors = Object.keys(errors).length === 0;

    if (noErrors) {
      const payload = {
        email: email,
        password: password,
      };

      axios
        .post('http://localhost:8081/auth/login', payload)
        .then((resp) => {
          // setUser(resp.data);
          console.log(resp);
          const obj = {
            userId: resp.data.userId,
            email: resp.data.email,
            password: resp.data.password

          }
          localStorage.setItem('mytoken', JSON.stringify(obj));
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', true);
          toast.success('Login Success');
          //alert("Login Success");
          setMessage(resp.data);
          //navigate('/');

          window.location.href = '/';
        })
        .catch((error) => {
          console.error(error);
          toast.error('login failed');
          setMessage(error.reponse.data);
        });
    }
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <ToastContainer position="top-center" autoClose={3000} />
        <DialogTitle id="form-dialog-title">User Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your email and password to login.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={Boolean(formErrors.userNameError)}
            helperText={formErrors.userNameError}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={Boolean(formErrors.passwordError)}
            helperText={formErrors.passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            Don't have an account? <Link to="/Registration">register</Link><br></br>
            <Link to="/ForgotPassword">ForgotPassword</Link>/
            <Link to="/ResetPasswordForm">ResetPassword</Link>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      </div>
  );
}

export default Login;
