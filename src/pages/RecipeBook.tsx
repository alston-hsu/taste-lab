import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import Navbar from '../components/Navbar';

interface SavedRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const RecipeBook = () => {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  useEffect(() => {
    const savedRecipesFromLocalStorage = localStorage.getItem('savedRecipes');
    console.log(savedRecipesFromLocalStorage);
    if (savedRecipesFromLocalStorage) {
      setSavedRecipes(JSON.parse(savedRecipesFromLocalStorage));
    }
  }, []);

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Recipe Book
          </Typography>
          
          {savedRecipes.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No saved recipes yet. Start exploring and save your favorites!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {savedRecipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};
export default RecipeBook;