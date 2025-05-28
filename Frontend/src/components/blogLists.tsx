import React, { useEffect, useState } from 'react';
import { blogListF, deleteBlogF } from '../frontendWrappers';
import { Box, Button, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {toast} from "sonner"

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

  const fetchBlogs = async () => {
      const data = await blogListF();

      if (data.hasOwnProperty('error')) {
          console.error('Error fetching blogs');
          toast.error('Error listing blogs');
      }
      else {
          setBlogs(data.blogs);
      }
  };

  useEffect(() => {
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
                        }}
                        onClick={async () => {
                            const confirmDelete = window.confirm(`Are you sure you want to delete "${blog.title}"?`);
                            if (!confirmDelete) return;

                            const res = await deleteBlogF(blog.blogId);

                            if (res.hasOwnProperty('error')) {
                                console.error('Error deleting blog');
                                toast.error('Error deleting blog');
                            }
                            else {
                                toast.success(`Deleted blog: ${blog.title}`)
                                await fetchBlogs();
                            }
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
