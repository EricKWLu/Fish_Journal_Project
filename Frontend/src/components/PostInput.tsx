import React from 'react';
import { Directions } from "@mui/icons-material"
import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
 
// Define a TypeScript interface for the blog
interface Blog {
    title: string;
    content: string;
    species: string;
    date: string;
    location: string;
  }
  
  // Define the props type for the BlogForm component
  interface BlogFormProps {
    addBlog: (blog: Blog) => void; // Function that takes a Blog object as an argument
  }

const PostInput: React.FC<BlogFormProps> = ({ addBlog }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [species, setSpecies] = useState("");
    const [location, setLocation] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title && date && species && location && content) {
            addBlog({ title, date, species, location, content});
            setTitle("");
            setDate("");
            setSpecies("");
            setLocation("");
            setContent("");
        };
    }
    
    return (
        <Box sx = {{
            display: 'flex',
            alignItems: 'start',
            width: '90%',
            height: 'auto',
            flexDirection: 'column',
            padding: '30px',

        }}>

            <form onSubmit={handleSubmit} style = {{
                width: '100%',
                height: '100%'
            }}>
                <Typography variant="h5">
                    Title
                </Typography>
                <TextField
                    value={title}
                    label = "Post Title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="newTitle"
                    sx = {{
                        marginTop: '3vh',
                        width: '90%'
                    }}>
                </TextField>


                <Typography variant="h5" sx = {{
                    marginTop: '3vh',
                    marginBottom: '3vh',
                }}>
                    Date/Time
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                    label="Date/Time" 
                    className='newTime'
                    
                    />
                </LocalizationProvider>

                <Typography variant="h5"
                sx = {{
                    marginTop: '3vh'
                }}>
                    Species
                </Typography>
                <TextField
                    label = "Fish Species"
                    className="newSpecies"
                    onChange={(e) => setSpecies(e.target.value)}
                    value={species}
                    sx = {{
                        marginTop: '3vh',
                        width: '90%'
                    }}>
                </TextField>

                <Typography variant="h5"
                sx = {{
                    marginTop: '3vh'
                }}>
                    Location
                </Typography>
                <TextField
                    label = "Location"
                    className="newLocation"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    sx = {{
                        marginTop: '3vh',
                        width: '90%'
                    }}>
                </TextField>
                

                <Typography variant="h5"
                sx = {{
                    marginTop: '3vh'
                }}>
                    Content
                </Typography>
                <TextField
                    label = "Content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    multiline
                    maxRows={15}
                    className="newContent"
                    sx = {{
                        marginTop: '3vh',
                        width: '90%'
                    }}>
                </TextField>

                <Button type='submit' className='newPostBtn' variant='contained' sx = {{
                    display: 'flex',
                    margin: 'auto',
                    marginTop: '5vh',
                    width: '40%',
                    height: '8vh',
                }}> 
                    Create Post 
                </Button>
            </form>

        </Box>
    )
}

export default PostInput;