import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const pages = ['Recipe Book'];

function NavBar() {
  let navigate = useNavigate();
  const routeToRecipeBook = () => {
    navigate('/recipe-book');
  };

  return (
    <AppBar position="static"
      sx={{
        background: 'rgb(0,0,128)',
        boxShadow: '0 3px 5px 2px black, .3'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontWeight: 700,
              letterSpacing: '.15rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out'
              } 
            }}
          >
            Taste Lab
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={routeToRecipeBook}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'all 0.2s ease-in-out'
                  } 
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;