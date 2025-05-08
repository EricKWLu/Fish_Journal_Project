import React from 'react';
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const Navbar = () => {
    return (
        <Box sx = {{
            minWidth:'100vw',
            height: '10vh',
            backgroundColor: '#BFD5E2',
            display: 'flex',
            position: 'fixed',
            top: '0px',
            zIndex: '999'
        }}>
            <Box sx = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh',
            }}>
                <nav className='navbar'>
                    <a href="/" className="home">
                        <img src='../src/assets/home.png' alt="Home Icon" style = {{
                            height: '6vh',
                            marginLeft: '1vw'
                        }}></img>
                    </a>
                    <a href="/map" className="map">
                        <img src='../src/assets/map.png' alt="Map Icon" style = {{
                            height: '6vh',
                            marginLeft: '2vw'
                        }}></img>
                    </a>
                    <a href="/new" className="new">
                        <img src='../src/assets/new.png' alt="New Icon" style = {{
                            height: '6vh',
                            marginLeft: '2vw'
                        }}></img>
                    </a>
                </nav>
            </Box>
            <Box sx = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh',
                paddingLeft: '65vw',
            }}>
                <TextField
                    label = "Search Field"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>
        </Box>
    )
}