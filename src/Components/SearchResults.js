import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  makeStyles,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  CardActions,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { mergeClasses } from '@material-ui/styles';
const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#303539',
    backgroundSize: 'cover',
    flexGrow: 1,

  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom:10,
    },
    description: {
      fontSize: 14,
      color: '#666',
    },
});


function SearchResults() {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const searchTitle = new URLSearchParams(location.search).get('title');
    if (searchTitle) {
      axios.get(`http://localhost:8081/api/video/search/title?title=${searchTitle}`)
        .then(response => {
          setVideos(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [location.search]);

  const handleVideoClick = (id) => {
    // navigate to video page
  };

  return (

    <div className={classes.root}>
            <Grid container spacing={2}>
      {videos.map((video) => (
        <Grid item xs={6} key={video.videoId}>
          <video width="625" height="400" controls>
            <source src={`data:video/mp4;base64,${video.videoFile}`} type="video/mp4" />
          </video>

           <Card className={classes.card} onClick={() => navigate(`/SingleVideoPage/${video.videoId}`)}>
            <CardContent>
               <Typography className={classes.title}>{video.title}</Typography>
               <Typography className={classes.description}>{video.description}</Typography>
             </CardContent>
           </Card>
         </Grid>
         ))}
      </Grid>

    </div>
  );
}

export default SearchResults;
