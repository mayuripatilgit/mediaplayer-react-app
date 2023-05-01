import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Snackbar } from "@material-ui/core";
import AllComments from "./AllComments";
import { BiWindows } from "react-icons/bi";

function AddComment(props) {
  const [text, setText] = useState("");
  const actor = JSON.parse(localStorage.getItem("mytoken"));
 // const [videoId, setVideoId] = useState(props.videoId);
 const videoId =props.videoId;
const userId = actor.userId;
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default behaviour of browser

    const payload = {
      text,
      createdAt: new Date().toISOString(),
      videoId,
      userId
    };

    axios
      .post("http://localhost:8081/api/comment/save", payload, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log(res);
        setSubmitStatus("success");
        setText("");
        window. location. reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          // fullWidth
          margin="normal"
        />
        <br></br>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      {submitStatus === "success" && <AllComments videoId={videoId}/>}
    </>
  );
}

export default AddComment;
