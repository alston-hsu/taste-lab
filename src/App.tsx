import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { getFoodByCategory } from './services/foodService';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { Container } from '@mui/material';
import RecipeContainer from './components/RecipeContainer';

const theme: Theme = createTheme(); 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <RecipeContainer />
    </ThemeProvider>
  );
}

export default App;
