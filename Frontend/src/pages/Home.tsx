import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material"
import { useState } from 'react';

export const Home = () => {
    const [blogs, setBlogs] = useState([]);

    return (
        <Box sx = {{
            width: '100vw',
            minHeight: '90vh',
            backgroundColor: 'white'

        }}>
            Home
        </Box>
    )
}