import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
  },
  // button: {
  //   marginTop: theme.spacing(2),

  // },
}));

const ChannelDemo = () => {
  const classes = useStyles();
  //   const history = useHistory();

  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelImage, setChannelImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showFailSnackbar, setShowFailSnackbar] = useState(false);
  const [error, setError] = useState(false);
  const actor = JSON.parse(localStorage.getItem("mytoken"));
  const navigate = useNavigate();
  const handleChannelNameChange = (event) => {
    setChannelName(event.target.value);
  };

  const handleChannelDescriptionChange = (event) => {
    setChannelDescription(event.target.value);
  };

  const handleChannelImageChange = (event) => {
    setChannelImage(event.target.files[0]);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = async () => {
    if (!channelName.trim()) {
      setError(true);
      return;
    }

    if (
      !channelImage ||
      !(
        channelImage.type.includes("image/png") ||
        channelImage.type.includes("image/jpg") ||
        channelImage.type.includes("image/jpeg")
      )
    ) {
      setError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("channelName", channelName);
      formData.append("about", channelDescription);
      formData.append("image", channelImage);
      formData.append("userId", actor.userId);
      console.log(formData);
      const response = await axios.post(
        `http://localhost:8081/api/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setShowSuccessSnackbar(true);

      navigate("/DisplayChannel");
    } catch (error) {
      console.error(error);
      //alert("An error occurred while creating the channel!");
      setShowFailSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccessSnackbar(false);
    setShowFailSnackbar(false);
  };

  return (
    <Card
      className={classes.root}
      sx={{
        marginLeft: "30%",
        marginRight: "30%",
        marginTop: "5%",
        marginBottom: "1%",
        boxShadow: "0px 0px 10px rgba(0,0,0,1)",
      }}
    >
      <CardContent>
        <Container maxWidth="sm">
          <Typography className={classes.title}>Create Channel</Typography>
          <form className={classes.form}>
            <TextField
              label="Name"
              variant="outlined"
              value={channelName}
              onChange={handleChannelNameChange}
              error={error && !channelName.trim()}
              helperText={
                error && !channelName.trim() ? "Name is required" : ""
              }
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              value={channelDescription}
              onChange={handleChannelDescriptionChange}
            />

            <TextField
              required
              fullWidth
              margin="normal"
              type="file"
              id="image"
              label="image file"
              key={channelImage}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: channelImage && (
                  <IconButton
                    onClick={() => setChannelImage(null)}
                    size="small"
                    style={{ color: "black", marginRight: "500px" }}
                  >
                    <ClearIcon />
                  </IconButton>
                ),
              }}
              onChange={(e) => setChannelImage(e.target.files[0])}
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleDialogOpen}
              className={classes.button}
            >
              Save
            </Button>
          </form>

          <Dialog open={openDialog} onClose={handleDialogCancel}>
            <DialogTitle>Confirm</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to create this channel?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogCancel} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDialogConfirm}
                color="primary"
                autoFocus
                href="/DisplayChannel"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={showSuccessSnackbar}
            onClose={handleSnackbarClose}
            message="Success! Congratulations your channel is created."
            autoHideDuration={3000}
            style={{ backgroundColor: green[500] }}
          />

          <Snackbar
            open={showFailSnackbar}
            onClose={handleSnackbarClose}
            message="Error! Channel is not created."
            autoHideDuration={3000}
            style={{ backgroundColor: red[500] }}
          />
        </Container>
      </CardContent>
    </Card>
  );
};
export default ChannelDemo;
