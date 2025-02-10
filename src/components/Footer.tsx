import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'rgb(0,0,128)',
        boxShadow: '0 3px 5px 2px black inset, .3',
        padding: '2rem 0',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">  
        <Box>
          <Typography variant="body1" color="white" align="center">
            © {new Date().getFullYear()} Taste Lab. Made by Alston Hsu.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;