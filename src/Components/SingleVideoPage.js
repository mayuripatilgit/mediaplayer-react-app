import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardMedia, IconButton } from "@material-ui/core";
import { Comment as CommentIcon } from "@material-ui/icons";
import AddComment from "./AddComment";
import AllComments from "./AllComments";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#303539',
    backgroundSize: 'cover',

  },
  button: {
    margin: theme.spacing(1),
  },
}));

const SingleVideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const classes = useStyles();

  const [comments, setComments] = useState([]);
  const [submitStatus, setSubmitStatus] = useState("");
  const [showComments, setShowComments] = useState(false);




  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/video/getByVideoId/${id}`)
      .then((response) => {
        setVideo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:8081/api/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, submitStatus]);

  const handleLike = () => {
    if (liked === null || liked === false) {
      setLikes(likes + 1);
      setLiked(true);
      if (dislikes > 0) {
        setDislikes(dislikes - 1);
      }
      axios.put(`http://localhost:8081/api/video/${id}/like`).then((res) => {
        console.log(res.data);
      });
    }
  };

  const handleDislike = () => {
    if (liked === null || liked === true) {
      setDislikes(dislikes + 1);
      setLiked(false);
      if (likes > 0) {
        setLikes(likes - 1);
      }
      axios.put(`http://localhost:8081/api/video/${id}/dislike`).then((res) => {
        console.log(res.data);
      });
    }
  };

  if (video.length === 0) {
    return <div>Loading...</div>;
  }

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className={classes.root}>
      <Card>

        <CardMedia
          component="video"
          src={`data:video/mp4;base64,${video[0].videoFile}`}
          title={video[0].title}
          controls
        />
        <CardHeader title={video[0].title} subheader={video[0].description} />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<ThumbUpIcon />}
          onClick={handleLike}
        >
          <Typography variant="button">{likes} Likes</Typography>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ThumbDownIcon />}
          onClick={handleDislike}
        >
          <Typography variant="button">{dislikes} Dislikes</Typography>
        </Button>

        <AddComment videoId={video[0].videoId} setSubmitStatus={setSubmitStatus} />
        <AllComments videoId={video[0].videoId} submitStatus={submitStatus} comments={comments} />
        {/* Add icon button to show/hide comments */}
        {comments.length > 0 && (
          <div>
            <IconButton onClick={handleShowComments}>
              <CommentIcon fontSize="small" />
              {showComments ? "Hide Comments" : "View Comments"}
            </IconButton>
            {showComments && (
              <div>
                <h2>All Comments:</h2>
                {comments.map((comment) => (
                  <div key={comment.commentId}>
                    <p>{comment.text}</p>
                    <p>By: {comment.user.username}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default SingleVideoPage;
