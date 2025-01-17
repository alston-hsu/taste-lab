import React, { useState, useEffect } from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import Filter from '../components/Filter';
import { getFoodByCategory, getAllFoodCategories } from '../services/foodService';
import { Recipe } from '../types/Recipe';
import Navbar from '../components/Navbar';

const Home = () => {
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
    <>
    <Navbar />
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        sx={{ flexDirection: "row", gap: 2 }}
      >
        {categories.map((category: { strCategory: string; }) => (
          <Filter
            key={category.strCategory}
            strCategory={category.strCategory}
            onClick={() => handleCategoryClick(category.strCategory)} />
        ))}
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.idMeal} />
        ))}
      </Box>
    </Container>
    </>
  );
};
export default Home;