import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import RecipeCard from './RecipeCard';
import Filter from './Filter';
import { getFoodByCategory, getAllFoodCategories } from '../services/foodService';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const RecipeContainer: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Beef');

  const handleCategoryClick = async (categoryClicked: string) => {
    setSelectedCategory(categoryClicked);
    const clickedCategoryRecipeData = await getFoodByCategory(categoryClicked);
    setRecipes(clickedCategoryRecipeData);
  };

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipeData = await getFoodByCategory(selectedCategory);
        const recipeCategoriesData = await getAllFoodCategories();
        setRecipes(recipeData);
        setCategories(recipeCategoriesData);
        console.log(categories);
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
      <Box display="flex" flexWrap="wrap" justifyContent="center" sx={{ flexDirection: 'row', gap: 2 }}>
        {categories.map((category: { strCategory: string }) => (
          <Filter
            key={category.strCategory}
            strCategory={category.strCategory}
            onClick={() => handleCategoryClick(category.strCategory)}
          />
        ))}
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.idMeal} />
        ))}
      </Box>
    </Container>
  );
};
export default RecipeContainer;