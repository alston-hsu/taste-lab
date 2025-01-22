import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import RecipeBook from './pages/RecipeBook';
import Navbar from './components/Navbar';
import { getFoodByCategory } from './services/foodService';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { Container } from '@mui/material';
import RecipeContainer from './components/RecipeContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:recipeID" element={<Recipe />} />
        <Route path="/recipe-book" element={<RecipeBook />} />
      </Routes>
    </Router>
  );
}

export default App;