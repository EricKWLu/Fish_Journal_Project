import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material"
import PostInput from "../components/PostInput"
import { useState } from "react";

interface Blog {
    title: string;
    content: string;
    species: string;
    date: string;
    location: string;
}

export const CreatePage = () => {
    return (
        <Box sx = {{
            minWidth: '100vw',
            minHeight: '90vh',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx = {{
                width: '70vw',
                height: 'auto',
                backgroundColor: '#BFD5E2',
                marginTop: '10vh',
                marginBottom: '10vh',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <PostInput/>
            </Box>
        </Box>
    )
}