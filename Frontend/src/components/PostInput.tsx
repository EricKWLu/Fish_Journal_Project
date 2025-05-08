import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { getBlogs } from '../../../dataStore'

// Define a TypeScript interface for the blog
interface Blog {
  title: string;
  content: string;
  species: string;
  date: string;
  location: string;
}

// Local data store
const blogDataStore = getBlogs();

const storeData = (blog: Blog) => {
  blogDataStore.blogs.push(blog);
};

//CREATE AN API AND CALL THAT TO PROPERLY STORE BLOGS

const PostInput: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && date && species && location && content) {
      storeData({
        title,
        date: date.toISOString(),
        species,
        location,
        content
      });
      setTitle("");
      setDate(dayjs());
      setSpecies("");
      setLocation("");
      setContent("");
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
