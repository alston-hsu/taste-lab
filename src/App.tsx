import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { getFoodByCategory } from '../services/foodService';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { Container } from '@mui/material';

const theme: Theme = createTheme(); 

function App() {
  const [food, setFood] = useState([]);

  useEffect(() => {
    getFoodByCategory();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <p>foodService</p>
      </Container>
    </ThemeProvider>
  );
}

export default App;
