import React, { useEffect, useState } from 'react';
import { blogListF } from '../frontendWrappers';
import { Box, Button, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export interface Blog {
    blogId: number;
    title: string;
    content: string;
    species: string;
    date: string;
    location: string;
}

function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
        const data = await blogListF();

        if (typeof data === 'number') {
            console.error('Error fetching blogs');
        }
        else {
            setBlogs(data.blogs);
        }
    };

    fetchBlogs();
  }, []);

  return (
    <Box sx = {{
        marginBottom: '20px'
    }}>
        {blogs.map((blog) => (
            <Box className="blog-box" key={blog.blogId} sx = {{
                width: '100vw',
                minHeight: '30vh',
                marginTop: '10vh',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Box sx = {{
                    backgroundColor: '#BFD5E2',
                    width: '70vw',
                    borderRadius: '10px',
                }}>
                    <Box sx = {{
                        display: 'flex'

                    }}>
                        <Typography variant="h5" sx={{
                        marginLeft: '10px',
                        marginTop: '10px', 
                        width: '95%'}}>
                            {blog.title}
                        </Typography>
                        
                        <Button sx = {{
                            marginTop: '10px',
                            marginRight: '10px',
                        }}>
                            <DeleteOutlineIcon></DeleteOutlineIcon>
                        </Button>
                    </Box>

                    <Box sx = {{
                        width: '100%',
                        padding: '10px',
                        display: 'flex',
                    }}>
                        <img src='../src/assets/fishPlaceholder.png' alt="fish" style={{
                            height: '20%',
                            width: '20%',
                        }}/>

                        <Box sx = {{
                            paddingLeft: '5%',
                            direction: 'column',
                        }}> 
                            <Typography variant="h6">
                                Species: {blog.species}
                            </Typography>

                            <Typography variant="h6" sx = {{
                                paddingTop: '10px'
                            }}>
                                Location: {blog.location}
                            </Typography>

                            <Typography variant="h6" sx = {{
                                paddingTop: '10px'
                            }}>
                                Date/Time: {blog.date}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        ))}
    </Box>
  );
}

export default BlogList;
