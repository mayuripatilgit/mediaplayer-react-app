import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActions,
} from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';



const VideoGallery = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8081/api/video/all`);
        setVideos(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleLike = async (videoId) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/video/${id}/like?userId=${userId}`
      );

      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === response.data.id ? response.data : video
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (videoId) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/video/3/dislike`
      );
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === response.data.id ? response.data : video
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <Typography variant="h4">Video Gallery</Typography> */}
      <Grid container spacing={3} >
        {videos.map((video) => (
          <Grid item key={video.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="video"
                src={`data:video/mp4;base64,${video.videoFile}`}
                title={video.title}
                controls
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  onClick={() => navigate(`/SingleVideoPage/${video.videoId}`)}
                >
                  {video.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {video.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="like"
                  onClick={() => handleLike(video.id)}
                >
                  <ThumbUp color={video.userLiked ? "primary" : "inherit"} />
                </IconButton>
                <Typography>{video.likes}</Typography>
                <IconButton
                  aria-label="dislike"
                  onClick={() => handleDislike(video.id)}
                >
                  <ThumbDown
                    color={video.userDisliked ? "secondary" : "inherit"}
                  />
                </IconButton>
                <Typography>{video.dislikes}</Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VideoGallery;
