import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useToken from '../../useToken';
import { Navigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


async function signUpUser(credentials) {
  return fetch('http://localhost:4000/api/v1/authentication/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

const theme = createTheme();

export default function Signup() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const { token } = useToken();
  const [isSuccess, setSuccess] = useState(false);
  const [errorCode, setError] = useState(0)

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const result = await signUpUser({
        email,
        password,
        firstName,
        lastName
      });
      if (result.code === 500) {
        setError(500)
      } else if (result.code === 400) {
        setError(400)
      } else {
        // setSuccess(true)
        console.log(result.code)
        setError(200)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (isSuccess) {
    return <Navigate to="/login" />
  }
  if (token) {
    return <Navigate to="/" />
  }

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={e => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={e => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {errorCode == 500 && <Alert severity="error"  onClose={() => setError(0)}>
              <AlertTitle>Error</AlertTitle>
              Email address is existed. <strong>Please try again!</strong>
            </Alert>}
            {errorCode == 400 && <Alert severity="error"  onClose={() => setError(0)}>
              <AlertTitle>Error</AlertTitle>
             Something happened. <strong>Please try again!</strong>
            </Alert>}
            {errorCode == 200 && <Alert severity="success"  onClose={() => setError(0)}>
              <AlertTitle>Success</AlertTitle>
            Sign up successfully. <strong>Redirect to login!</strong>
            </Alert>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}