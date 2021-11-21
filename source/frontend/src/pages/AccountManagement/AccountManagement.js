import React, { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Toolbar, Paper, Typography, IconButton, TextField } from '@mui/material';
import useToken from '../../useToken';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const mdTheme = createTheme();


export default function AccountManagement() {
  // const user = {
  //   email: "abc@gmail.com",
  //   firstName: "manh",
  //   lastName: "luong"
  // }
  const { token } = useToken()
  const [user, setUser] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [address, setAddress] = useState()
  const [phone, setPhone] = useState()
  const [fax, setFax] = useState()

  useEffect(() => {
    // fetch('http://localhost:4000/api/v1/users/'+token.email, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token.accessToken,
    //   },
    // })
    //   .then(response => response.json())
    //   .then(data => setUser(data))
    async function fetchUser() {
      const response = await fetch('http://localhost:4000/api/v1/users/' + token.email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.accessToken,
        },
      })
      const data = await response.json()
      setUser(data)
    }
    fetchUser()
  }, [])
  console.log(firstName)
  return <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={1} columnSpacing={2}>
            <Grid item xs={12} lg={2}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Email
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
                {user?.email}
              </Paper>
            </Grid>
            <Grid item xs={12} lg={2}>
            </Grid>
            <Grid item xs={12} lg={2}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: "bold" }}>
                  First Name
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {user?.firstName}
              </Paper>
              <TextField
              margin="normal"
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              style={ firstName? {}: {display: 'none'} }
              onChange={e => setFirstName(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} lg={2}>
              <IconButton sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setFirstName(true)}>
                <EditIcon />
              </IconButton>
              <IconButton style={ firstName? {}: {display: 'none'} } sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setFirstName(false)}>
                <ArrowDropUpIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} lg={2}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Last Name
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {user?.lastName}
              </Paper>
              <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              autoFocus
              style={ lastName? {}: {display: 'none'} }
              onChange={e => setLastName(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} lg={2}>
              <IconButton sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setLastName(true)}>
                <EditIcon />
              </IconButton>
              <IconButton style={ lastName? {}: {display: 'none'} } sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setLastName(false)}>
                <ArrowDropUpIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} lg={2}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Address
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {user?.address ? user?.address : "No address info" }
              </Paper>
              <TextField
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              autoFocus
              style={ address? {}: {display: 'none'} }
              onChange={e => setAddress(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} lg={2}>
              <IconButton sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setAddress(true)}>
                <EditIcon />
              </IconButton>
              <IconButton style={ address? {}: {display: 'none'} } sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setAddress(false)}>
                <ArrowDropUpIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} lg={2}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Phone
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {user?.phone ? user?.phone : "No phone info" }
              </Paper>
              <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Phone"
              autoFocus
              style={ phone? {}: {display: 'none'} }
              onChange={e => setPhone(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} lg={2}>
              <IconButton sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setPhone(true)}>
                <EditIcon />
              </IconButton>
              <IconButton style={ phone? {}: {display: 'none'} } sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setPhone(false)}>
                <ArrowDropUpIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} lg={2}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: "bold" }}>
                  Fax
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {fax?.phone ? fax?.phone : "No fax info" }
              </Paper>
              <TextField
              margin="normal"
              fullWidth
              id="fax"
              label="Fax"
              autoFocus
              style={ fax? {}: {display: 'none'} }
              onChange={e => setFax(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} lg={2}>
              <IconButton sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setFax(true)}>
                <EditIcon />
              </IconButton>
              <IconButton style={ fax? {}: {display: 'none'} } sx={{ p: 2, display: 'flex', flexDirection: 'column' }} onClick={() => setFax(false)}>
                <ArrowDropUpIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
    <Footer />

  </ThemeProvider>

}