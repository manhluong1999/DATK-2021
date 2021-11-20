import { Container, Link, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const mdTheme = createTheme();


export const Footer = () => {
    return <ThemeProvider theme={mdTheme}>
      <Box
    component="footer"
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
  >
    <Container maxWidth="sm">
      <Typography variant="body1">
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/manh.lt1901">
        MTL
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </Container>
  </Box>
    </ThemeProvider>
}