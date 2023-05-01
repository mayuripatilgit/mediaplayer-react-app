import { Grid } from "@material-ui/core";
import React from "react";
import Navbar1 from "./Navbar1";
import VideoGallery from "./VideoGallery";

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
function Home() {
    const classes = useStyles();
  return (
    <div className={classes.root}>

        <Navbar1 />

        <VideoGallery />

    </div>
  );
}

export default Home;
