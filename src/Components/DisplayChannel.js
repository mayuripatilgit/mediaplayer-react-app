import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Typography,
  Box,
  Container,
  Grid,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const DisplayChannel = () => {
  const [channels, setChannels] = useState([]);
  const [videos, setVideos] = useState({});
  const actor = JSON.parse(localStorage.getItem("mytoken"));
  const userId = actor.userId;
  const navigate = useNavigate();
  const classes = useStyles();


  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/channel/getByUserId/${userId}`)
      .then((response) => {
        console.log(response.data);
        setChannels(response.data);

        response.data.forEach((channel) => {
          axios
            .get(
              `http://localhost:8081/api/video/video/getBychannelId/${channel.channelId}`
            )

            .then((response) => {
              console.log(response.data);
              setVideos((prevVideos) => ({
                ...prevVideos,
                [channel.channelId]: response.data,
              }));
            })
            .catch((error) => {
              console.error("Error fetching video data:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching channel data:", error);
      });
  }, []);

  const deleteChannel = (channelId) => {
    axios
      .delete(
        `http://localhost:8081/api/channel/deleteByChannelId/${channelId}`
      )
      .then((response) => {
        setChannels(
          channels.filter((channel) => {
            return channel.channelId !== channelId;
          })
        ).catch((err) => {
          console.log(err);
        });
      });
  };

  const handleDeleteChannel = (channelId) => {
    confirmAlert({
      title: "Confirm Delete",
      message:
        "Are you sure you want to delete this channel and all of its videos?",
      buttons: [
        {
          label: "Yes",
          color: "primary",
          onClick: () => {
            deleteChannel(channelId);
            toast.success("Channel deleted successfully");
          },
          className: "btn btn-danger",
        },
        {
          label: "No",
          color: "primary",
          onClick: () => {
            navigate("/DisplayChannel");
          },
          className: "btn btn-secondary",
        },
      ],
    });
  };
  console.log(channels);
  if (channels.length === 0) {
    return <div>No Channel is available</div>;
  }

  const deleteVideo = (videoId) => {
    axios
      .delete(`http://localhost:8081/api/video/${videoId}`)
      .then((response) => {
        setVideos("")
        window.reload();
        }).catch((err) => {
          console.log(err);
      });
  };
  const handleDeleteVideo = (videoId) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this video ?",
      buttons: [
        {
          label: "Yes",
          color: "primary",
          onClick: () => {
            deleteVideo(videoId);
            toast.success("video deleted successfully");
          },
          className: "btn btn-danger",
        },
        {
          label: "No",
          color: "primary",
          onClick: () => {
            navigate("/DisplayChannel");
          },
          className: "btn btn-secondary",
        },
      ],
    });
  };

  console.log(videos);

  return (

      <div className={classes.root}>
    <Container maxWidth="md">
      <Box mt={5}>
        {channels.map((channel) => (
          <Card
            key={channel.channelId}
            style={{ marginBottom: "16px", position: "relative" }}
          >
            <CardContent>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Avatar
                    alt={channel.channelName}
                    src={`data:image/jpeg;base64,${channel.image}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </Grid>
                <Grid item xs={7} style={{ paddingRight: "40px" }}>
                  <Typography variant="h5" style={{ marginBottom: "8px" }}>
                    {channel.channelName}
                  </Typography>
                  <Typography variant="body1">{channel.about}</Typography>
                </Grid>
                <Grid
                  item
                  style={{ position: "absolute", top: "8px", right: "8px" }}
                >
                  <IconButton
                    color="primary"
                    size="small"
                    style={{
                      marginRight: "22px",
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                    onClick={() =>
                      navigate(`/UploadVideo/${channel.channelId}`)
                    }
                  >
                    <UploadIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    size="small"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                    onClick={() => handleDeleteChannel(channel.channelId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    href="/"
                    color="#3c3c3c "
                    size="small"
                    style={{
                      marginRight: "19px",
                      position: "absolute",
                      top: "0",
                      right: "36px",
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>

            {videos[channel.channelId] &&
              videos[channel.channelId].map((video) => (
                <CardContent
                  key={video.videoId}
                  style={{ borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}
                >
                  <video width="320" height="240" controls>
                    <source
                      src={`data:video/mp4;base64,${video.videoFile}`}
                      type="video/mp4"
                    />
                  </video>
                  <IconButton
                    color="secondary"
                    size="small"
                    style={{
                      position: "absolute",
                      top: "40",
                      right: "0",
                    }}
                    onClick={() => handleDeleteVideo(video.videoId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="body1" onClick={() => navigate(`/SingleVideoPage/${video.videoId}`)}>{video.title}</Typography>

                </CardContent>
              ))}
          </Card>
        ))}
      </Box>
    </Container>
    </div>
  );
};

export default DisplayChannel;
