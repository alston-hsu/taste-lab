import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import RecipeCard from './RecipeCard';
import { getFoodByCategory } from '../services/foodService';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const RecipeContainer: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipeData = await getFoodByCategory();
        setRecipes(recipeData);
        console.log(recipes);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.idMeal} />
        ))}
      </Box>
    </Container>
  );
};export default RecipeContainer;