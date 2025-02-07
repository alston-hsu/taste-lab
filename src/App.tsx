import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import RecipeBook from './pages/RecipeBook';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Box>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:recipeID" element={<Recipe />} />
          <Route path="/recipe-book" element={<RecipeBook />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;