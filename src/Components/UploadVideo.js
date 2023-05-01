import React, { useState ,useRef} from "react";
import axios from "axios";
import { TextField, Button, Typography, IconButton ,Box} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Clear as ClearIcon } from "@material-ui/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const actor = JSON.parse(localStorage.getItem("mytoken"));

  const [userId, setUserId] = useState(actor.userId);
  const {channelId} = useParams();
  const fileInputRef = useRef();
  const [error, setError] = useState(false);
  console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title.trim()){
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("channelId", channelId);
    formData.append("userId", userId);

    try {
      const response = await axios.post(`http://localhost:8081/api/video/videos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success('Video uploaded successfully!');
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setUserId("");
    } catch (error) {
      console.error(error);
      toast.error('Please upload a valid MP4 file!');
    }
  };

  const handleClear = () => {
    setVideoFile(null);
    fileInputRef.current.value = null;
  }

  return (

    <div style={{ textAlign: "center" }}>
      <Typography variant="h4">Upload Video</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          margin="normal"
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error && !title.trim()}
          helperText={error && !title.trim() ? 'title is required' : ''}
        />
        <TextField
          fullWidth
          margin="normal"
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          type="file"
          id="videoFile"
          label="Video File"
          key={videoFile}

          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              videoFile && (
                <IconButton onClick={() => setVideoFile(null)} size="small" style={{color:"black",marginRight:"1000px"}}>
                  <ClearIcon />
                </IconButton>
              )
            )
          }}
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
        <Box>
        <Button type="submit" variant="contained" size='large' color="primary" style={{ marginTop: '5%', marginLeft: "4%" }} onClick={handleSubmit}>
          Submit
        </Button><Button type="submit"   size='large' variant="contained" color="secondary" style={{ marginTop: '5%', marginLeft: "10%" }} href='/'>Cancel </Button>
</Box>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UploadVideo;
