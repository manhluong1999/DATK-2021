import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListItem, ListItemIcon  } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InfoIcon from '@mui/icons-material/Info';
import ApiIcon from '@mui/icons-material/Api';
import PublicIcon from '@mui/icons-material/Public';

export default function Navbar {
    return  (
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
            <ListItem button onClick={() => navigate('/')} >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Home Page" />
            </ListItem>
            <ListItem button onClick={() => navigate('/aboutme')}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About Me" />
            </ListItem>
            <ListItem button onClick={() => navigate('/lectures')}>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Lectures" />
            </ListItem>
            <ListItem button onClick={() => navigate('/projects')}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
            <ListItem button onClick={() => navigate('/software')}>
              <ListItemIcon>
                <ApiIcon />
              </ListItemIcon>
              <ListItemText primary="Software" />
            </ListItem>
            <ListItem button onClick={() => navigate('/publications')}>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Publications" />
            </ListItem>
        </List>
        <Divider />
      </Drawer>
    )
}