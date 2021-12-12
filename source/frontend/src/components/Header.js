import React from 'react';
import { Navigate, useNavigate, useMatch } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { ListItem, ListItemIcon, Menu, MenuItem } from '@mui/material';
import useToken from '../useToken';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InfoIcon from '@mui/icons-material/Info';
import ApiIcon from '@mui/icons-material/Api';
import PublicIcon from '@mui/icons-material/Public';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { getBlob } from './common';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { token } = useToken()
  const [page, setPage] = React.useState()
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const routeToAccount = () => {
    handleClose()
    navigate('/account')
  }

  const handleDownload = async () => {
    const response = await fetch('http://localhost:4000/api/v1/posts/download/' + token.uid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.accessToken,
      },
    })
    const data = await response.json()
    await getBlob(data.url, `${token.email.split('@')[0]}.html`)
  }
  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Hi {token.email}
          </Typography>
          <IconButton
            size="large"
            aria-label="download html"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleDownload}
          >
            <FileDownloadIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
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
            onClose={handleClose}
          >
            <MenuItem onClick={routeToAccount} >
              <IconButton color="inherit" sx={{ alignItems: "center" }} >
                <SettingsIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 0.1 }}>
                Account management
              </Typography>
            </MenuItem>
            <MenuItem onClick={logOut}>
              <IconButton color="inherit" >
                <LogoutIcon />
              </IconButton>
              <Typography variant="h6">
                Log out
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button onClick={() => {
            setPage('aboutme')
            navigate('/')
          }} style={{ backgroundColor: page === "aboutme" ? "#1976d2" : "" }}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Me" />
          </ListItem>
          <ListItem button onClick={() => {
            setPage('lectures')
            navigate('/lectures')
          }} style={{ backgroundColor: page === "lectures" ? "#1976d2" : "" }}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Lectures" />
          </ListItem>
          <ListItem button onClick={() => {
            setPage('projects')
            navigate('/projects')
          }} style={{ backgroundColor: page === "projects" ? "#1976d2" : "" }}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button onClick={() => {
            setPage('software')
            navigate('/software')
          }} style={{ backgroundColor: page === "software" ? "#1976d2" : "" }}>
            <ListItemIcon>
              <ApiIcon />
            </ListItemIcon>
            <ListItemText primary="Software" />
          </ListItem>
          <ListItem button onClick={() => {
            setPage('publications')
            navigate('/publications')
          }} style={{ backgroundColor: page === "publications" ? "#1976d2" : "" }}>
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Publications" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </>
  );
}

export const Header = () => {
  const { token } = useToken();

  if (!token) {
    return <Navigate to="/login" />
  }
  return <>
    <DashboardContent />
  </>;
}