import { Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getRecipeByID } from '../services/foodService';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import RecipeNotification from '../components/RecipeNotification';

const Recipe: React.FC = () => {
  const [recipe, setRecipe] = useState<any>({});
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const { recipeID } = useParams();
  const recipeData = getRecipeByID(recipeID || '');  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const savedRecipesFromLocalStorage = localStorage.getItem('savedRecipes');

  const handleSaveClick = (recipe: any) => {
    console.log(localStorage.getItem(recipe.idMeal));
    if (savedRecipes.find((savedRecipe: any) => savedRecipe.idMeal === recipe.idMeal)) {
      setNotificationMessage('Recipe already saved!');
      setShowNotification(prevShowNotification => !prevShowNotification);
    } else {
      const updatedSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(updatedSavedRecipes);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
      setNotificationMessage('Recipe saved!');
      setShowNotification(prevShowNotification => !prevShowNotification);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    recipeData.then((data) => {
      setRecipe(data);
    });
    setSavedRecipes(JSON.parse(savedRecipesFromLocalStorage || '[]'));
  }, []);

  return (
    <Box>
      <Navbar />
      <RecipeNotification
        open={showNotification}
        onClose={handleCloseNotification}
        message={notificationMessage}
      />
      <RecipeDetails
        onClick={() => handleSaveClick(recipe)}
        recipe={recipe}
      />
    </Box>
  );
};
export default Recipe;