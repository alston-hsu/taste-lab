import React from 'react';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { Container } from '@mui/material';

const theme: Theme = createTheme(); 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <p>test</p>
      </Container>
    </ThemeProvider>
  );
}

export default App;
