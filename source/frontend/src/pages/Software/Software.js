import React, { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Toolbar, Paper, Typography, IconButton, Button, TextField, Menu, MenuItem } from '@mui/material';
import useToken from '../../useToken';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const mdTheme = createTheme();

export default function Software() {
  const { token } = useToken()
  const [softwares, setSoftwares] = useState([])
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event, data) => {
    setAnchorEl(event.currentTarget);
    setId(data.id)
    setContent(data.content)
    setTitle(data.title)
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickUpdateOpen = () => {
    setUpdateOpen(true);
  };

  const handleCloseUpdateOpen = () => {
    setUpdateOpen(false);
  };
  const handleSubmit = async () => {
    await createPost({
      uid: token.uid,
      page: "software",
      content: content,
      title: title,
    })
    handleClose()
  }
  const handleSubmitUpdate = async () => {
    await updatePost({
      content: content,
      title: title,
    })
    handleCloseUpdateOpen()
    handleCloseMenu()
  }
  const handleDelete = async () => {
    await deletePost()
    handleCloseMenu()
  }
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:4000/api/v1/posts/${token.uid}?page=software`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.accessToken,
        },
      })
      const data = await response.json()
      setSoftwares(data)
    }
    fetchUser()
  }, [refreshKey])

  const updatePost = async (body) => {
    await fetch('http://localhost:4000/api/v1/posts/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken,
      },
      body: JSON.stringify(body)
    })
    setRefreshKey(oldKey => oldKey + 1)
  }
  const deletePost = async (body) => {
    await fetch('http://localhost:4000/api/v1/posts/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken,
      },
      body: JSON.stringify(body)
    })
    setRefreshKey(oldKey => oldKey + 1)
  }

  const createPost = async (body) => {
    await fetch('http://localhost:4000/api/v1/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken,
      },
      body: JSON.stringify(body)
    })
    setRefreshKey(oldKey => oldKey + 1)
  }
  console.log(id)
  return <>
    <ThemeProvider theme={mdTheme}>
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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <IconButton onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
            <Grid container spacing={2} columnSpacing={2}>
              {softwares?.map((e) => {
                return (
                  <>
                    <Grid item xs={12} md={8} lg={5} key={e._id}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 240,
                        }}
                      >
                        <Typography variant="h4" > {e.title}</Typography>
                        <Typography variant="body1" > {e.content}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={1}>
                      <IconButton color="inherit" sx={{ alignItems: "center" }} onClick={(event) => handleMenu(event, e)} >
                        <SettingsIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem onClick={handleClickUpdateOpen} >
                          <IconButton color="inherit" sx={{ alignItems: "center" }} >
                            <BuildIcon />
                          </IconButton>
                          <Typography variant="h6" sx={{ flexGrow: 0.1 }}>
                            Update
                          </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                          <IconButton color="inherit" >
                            <DeleteIcon />
                          </IconButton>
                          <Typography variant="h6">
                            Delete
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Grid>
                  </>
                )
              })}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={e => setTitle(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <TextareaAutosize
          label="content"
          aria-label="content textarea"
          placeholder="content"
          style={{ width: 550, height: 300 }}
          onChange={e => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
    <Dialog open={updateOpen} onClose={handleCloseUpdateOpen}>
      <DialogTitle>Form update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={e => setTitle(e.target.value)}
          style={{ marginBottom: 10 }}
          defaultValue={title}
        />
        <TextareaAutosize
          label="content"
          aria-label="content textarea"
          placeholder="content"
          style={{ width: 550, height: 300 }}
          onChange={e => setContent(e.target.value)}
          defaultValue={content}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseUpdateOpen}>Cancel</Button>
        <Button onClick={handleSubmitUpdate}>Submit</Button>
      </DialogActions>
    </Dialog>
  </>

}