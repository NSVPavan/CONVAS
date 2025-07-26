import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    CoSketch
                </Typography>
                <Button color="inherit" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Button>
                <Button color="inherit" component={Link} to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Button>
                <Button color="inherit" component={Link} to="/registration" style={{ textDecoration: 'none', color: 'inherit' }}>Registration</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
