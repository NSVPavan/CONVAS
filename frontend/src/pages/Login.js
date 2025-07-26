import { useRef, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Snackbar } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';

export const Login = () => {

  const formRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const reqData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const responseData = await loginUser(reqData); 
      console.log(responseData);

      setSnackbarMessage('User loggedIn successfully!');
      setOpenSnackbar(true);

      formRef.current.reset();

      localStorage.setItem('token', responseData.token);
      localStorage.setItem('userId', responseData.userId);
      localStorage.setItem('username', responseData.username);
      localStorage.setItem('fullname', responseData.fullname);

      navigate('/whiteboards');
      
    } catch (error) {
      console.log(`error while logging in user : ${error}`);
      
      setSnackbarMessage('Incorrect username or password!');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            <Link to="/registration" variant="body2">
              Don't have an account? Sign Up
            </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        />
    </Container>
  );
}
