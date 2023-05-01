import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Paper, List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { useParams } from "react-router-dom";

const AllComments = () => {
  const [comments, setComments] = useState([]);
  const { videoId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8081/api/comments/${videoId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [videoId]);
  console.log(comments);
  return (
    <Paper elevation={3}>
      <Typography variant="h6" align="center" gutterBottom>
        Comments
      </Typography>
      <Divider />
      <List>
      {comments.map(comment => (
  <div key={comment.id}>
    <ListItem>
      <ListItemText
        primary={comment.text}
        secondary={`Posted by: ${comment.user ? comment.user.firstName : 'Unknown User'}`}
      />
    </ListItem>
    <Divider variant="inset" component="li" />
  </div>
))}

      </List>
    </Paper>
  );
};

export default AllComments;
