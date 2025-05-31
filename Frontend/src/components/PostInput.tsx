import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { createBlogWrapperF } from '../frontendWrappers';
import { data } from 'react-router-dom';
import {toast} from "sonner"

//CREATE AN API AND CALL THAT TO PROPERLY STORE BLOGS
//CHANGE ALERTS TO SONNER TOAST

const PostInput: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && date && species && location && content) {

      const formattedDate = date.format('YYYY/M/D   H:m')

      const formData = new FormData();
      formData.append('title', title);
      formData.append('date', formattedDate);
      formData.append('species', species);
      formData.append('location', location);
      formData.append('content', content);

      if (image) {
        formData.append('image', image);
      }

      createBlogWrapperF(formData)
      .then(() => {
        toast.success('Successfuly created a new blog post!');

        setTitle("");
        setDate(dayjs());
        setSpecies("");
        setLocation("");
        setContent("");
        setImage(null);
      })
      .catch(() => toast.error('Failed to create post, make sure all required content is filled'));
    } else{
      toast.error('All fields excluding images are required');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'start',
      width: '90%',
      height: 'auto',
      flexDirection: 'column',
      padding: '30px',
    }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
        <Typography variant="h5">Title</Typography>
        <TextField
          value={title}
          label="Post Title"
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginTop: '3vh', width: '90%' }}
        />

        <Typography variant="h5" sx={{ marginTop: '3vh', marginBottom: '3vh' }}>
          Date/Time
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Date/Time"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>

        <Typography variant="h5" sx={{ marginTop: '3vh' }}>Species</Typography>
        <TextField
          label="Fish Species"
          onChange={(e) => setSpecies(e.target.value)}
          value={species}
          sx={{ marginTop: '3vh', width: '90%' }}
        />

        <Typography variant="h5" sx={{ marginTop: '3vh' }}>Location</Typography>
        <TextField
          label="Location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          sx={{ marginTop: '3vh', width: '90%' }}
        />

        <Typography variant="h5" sx={{ marginTop: '3vh' }}>Content</Typography>
        <TextField
          label="Content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          multiline
          maxRows={15}
          sx={{ marginTop: '3vh', width: '90%' }}
        />

         <Typography variant="h5" sx={{ marginTop: '3vh' }}>Upload Image</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImage(file);
          }}
          style={{ marginTop: '2vh', marginBottom: '2vh' }}
        />

        <Button
          type='submit'
          variant='contained'
          sx={{
            display: 'flex',
            margin: 'auto',
            marginTop: '5vh',
            width: '40%',
            height: '8vh',
          }}
        >
          Create Post
        </Button>
      </form>
    </Box>
  );
};

export default PostInput;
