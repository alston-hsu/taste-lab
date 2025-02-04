import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, TextField } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import Navbar from '../components/Navbar';
import RecipeNotification from '../components/RecipeNotification';
import Grid from '@mui/material/Grid2';

const RecipeBook = () => {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const savedRecipesFromLocalStorage = localStorage.getItem('savedRecipes');

  const handleDeleteClick = (recipeId: string) => {
    const updatedRecipes = savedRecipes.filter((recipe) => recipe.idMeal !== recipeId);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    setNotificationMessage('Recipe deleted!');
    setShowNotification(!showNotification);
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
      <Container maxWidth="xl">
        <Box py={4}>
          <Typography pl={2} variant="h4" component="h1" gutterBottom>
            My Recipe Book
          </Typography>
          
          {savedRecipes.length === 0 ? (
            <Typography variant="body1" color="black">
              No saved recipes yet. Add some recipes to your recipe book!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {savedRecipes.map((recipe) => (
                <Grid 
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}  
                  key={recipe.idMeal}>
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