import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useToken from '../../useToken';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router';

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
const theme = createTheme();

async function loginUser(credentials) {
  return fetch('http://localhost:4000/api/v1/authentication/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => {
      return data.json()
    })
}

export default function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorCode, setError] = useState(0)
  const { token, setToken } = useToken();
  const navigate = useNavigate()
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      if (!email || !password) {
        setError(1)
        return
      }
      const token = await loginUser({
        email,
        password
      });
      if (token.code != 400) {
        alert('Login Successfully')
        setError(200)
        setToken(token);
      } else {
        setError(400)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (token) {
    navigate('/')
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
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
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Alert severity="error" style={{ display: errorCode == 400 ? "" : "none" }} onClose={() => setError(0)}>
              <AlertTitle>Error</AlertTitle>
              Email or password is incorrect. <strong>Please try again!</strong>
            </Alert>
            <Alert severity="error" style={{ display: errorCode == 1 ? "" : "none" }} onClose={() => setError(0)}>
              <AlertTitle>Error</AlertTitle>
              Please enter email and password
            </Alert>
            {errorCode == 200 && <Alert severity="success" onClose={() => setError(0)}>
              <AlertTitle>Success</AlertTitle>
              Log in successfully. <strong>Redirect to homepage!</strong>
            </Alert>}
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}