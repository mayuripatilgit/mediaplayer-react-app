import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#303539',
    backgroundSize: 'cover',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "auto",
  },
  button: {
    margin: theme.spacing(2),
  },
}));

function Profile(props) {
  const classes = useStyles();
  const { name, channel } = props;

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userData, setUserData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const actor = JSON.parse(localStorage.getItem("mytoken"));
  const userId = actor.userId;
  useEffect(() => {
    // Fetch user data from API
    axios
      .get(`http://localhost:8081/api/user/id/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });


    axios
      .get(`http://localhost:8081/api/channel/getByUserId/${userId}`)
      .then((response) => {
        setChannelData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={classes.root}>
      <Card>
        <CardHeader variant="h4" title="User Profile" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <Avatar
                alt={userData?.name || "User"}
                src={userData?.avatar || ""}
                className={classes.avatar}
              />
              <Typography variant="h6" align="center">
                {userData?.name || "User"}
              </Typography>
              <Typography variant="subtitle1" align="center" >
                {userData?.email || ""}
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography variant="h6">Channel Information</Typography>


              {channelData && (
                <div>

                  {channelData.map(channel => (
                    <div key={channel.channelId}>

                      <h4>  Channel Name: {channel.channelName}</h4>

                    </div>
                  ))}
                </div>
              )}



            </Grid>
          </Grid>
        </CardContent>
        <CardActions>

          <Link to="/" style={{ textDecoration: "none", marginLeft: "10%" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Home
            </Button>
          </Link>
        </CardActions>
      </Card>


      <ToastContainer />
    </div>
  );
}

export default Profile;
