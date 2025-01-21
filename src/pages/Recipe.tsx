import { Box, Container } from '@mui/material';
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getRecipeByID } from '../services/foodService';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';

const Recipe = () => {
  const [recipe, setRecipe] = React.useState<Recipe>({});
  const { recipeID } = useParams();
  const recipeData = getRecipeByID(recipeID);  

  useEffect(() => {
    recipeData.then((data) => {
      setRecipe(data);
    });
  }, []);

  return (
    <Box>
      <Navbar />
      <RecipeDetails
      recipe={recipe}
      />
    </Box>
  );
};
export default Recipe;