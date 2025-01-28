import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container, Box, TextField } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import Navbar from '../components/Navbar';
import RecipeNotification from '../components/RecipeNotification';

interface SavedRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const RecipeBook = () => {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const savedRecipesFromLocalStorage = localStorage.getItem('savedRecipes');

  const handleDeleteClick = (recipeId: string) => {
    const updatedRecipes = savedRecipes.filter((recipe) => recipe.idMeal !== recipeId);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    setNotificationMessage('Recipe deleted!');
    setShowNotification(prevShowNotification => !prevShowNotification);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    if (savedRecipesFromLocalStorage) {
      setSavedRecipes(JSON.parse(savedRecipesFromLocalStorage));
    }
  }, []);

  return (
    <Box>
      <Navbar />
      <RecipeNotification
        message={notificationMessage}
        open={showNotification}
        onClose={handleCloseNotification}
      />
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Recipe Book
          </Typography>
          
          {savedRecipes.length === 0 ? (
            <Typography variant="body1" color="black">
              No saved recipes yet. Add some recipes to your recipe book!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {savedRecipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
                  <RecipeCard recipe={recipe} onClick={() => {handleDeleteClick(recipe.idMeal)}} />
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