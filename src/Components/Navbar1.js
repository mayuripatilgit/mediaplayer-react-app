import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import './Navbar1.css';
import { IconContext } from "react-icons";
import * as CgIcons from "react-icons/cg";
import Login from "./Login";
import SearchBar from "./SearchBar";
import { useNavigate } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
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

function Navbar1() {
  const [sidebar, setSidebar] = useState(false);
  const classes = useStyles();
  const showSidebar = () => setSidebar(!sidebar);
  const actor = JSON.parse(localStorage.getItem("mytoken"));
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setOpenDialog(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("mytoken");
    navigate("/");
    setOpenDialog(false);
    setOpenSnackbar(true);
  };

  const handleLogoutCancel = () => {
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <div className="space-toggle" align="top">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar space-toggle">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className="text-h1" style={{ marginLeft: "-91px" }}>Mi Tube</h1>

          <SearchBar />

          {actor ? (
            <div style={{ marginRight: "20 %", color: "white" }}>
              {actor.email}
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ExitToAppIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Dialog open={openDialog} onClose={handleLogoutCancel}>
                <DialogTitle>Logout</DialogTitle>
                <DialogContent>
                  <Typography variant="body1">
                    Are you sure you want to logout?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleLogoutConfirm} color="secondary">
                    Yes
                  </Button>
                  <Button onClick={handleLogoutCancel} color="primary">
                    No
                  </Button>
                </DialogActions>
              </Dialog>

              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
              >
                <SnackbarContent
                  style={{ backgroundColor: "#43a047" }}
                  message="Logout successful!"
                />
              </Snackbar>
              <ToastContainer />
            </div>

          ) :
            (
              <div style={{ marginleft: "100px" }}>
                <Login />
              </div>
            )}
          <nav
            className={sidebar ? "nav-menu active" : "nav-menu"}
            style={{ zIndex: "10" }}
          >
            <ul
              className="nav-menu-items"
              onClick={showSidebar}
              margin-left="-32px"
              margin-bottom="14px"
            >
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {Sidebar.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
      <div className="content" style={{ padding: "80px 0 0 240px" }}>

      </div>
    </div>
  );
}

export default Navbar1;
