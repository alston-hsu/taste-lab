import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import Filter from '../components/Filter';
import { getFoodByCategory, getAllFoodCategories } from '../services/foodService';
import { Recipe } from '../types/Recipe';
import Navbar from '../components/Navbar';
import RecipeNotification from '../components/RecipeNotification';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Beef');
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const savedRecipesFromLocalStorage = localStorage.getItem('savedRecipes');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleCategoryClick = async (categoryClicked: string) => {
    setSelectedCategory(categoryClicked);
    const clickedCategoryRecipeData = await getFoodByCategory(categoryClicked);
    setRecipes(clickedCategoryRecipeData);
  };

  const handleSaveClick = (recipe: Recipe) => {
    console.log(localStorage.getItem(recipe.idMeal));
    if (savedRecipes.find((savedRecipe: Recipe) => savedRecipe.idMeal === recipe.idMeal)) {
      setNotificationMessage('Recipe already saved!');
      setShowNotification(prevShowNotification => !prevShowNotification);
    } else {
      const updatedSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(updatedSavedRecipes);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
      setNotificationMessage('Recipe saved!');
      setShowNotification(prevShowNotification => !prevShowNotification);
    }
  }

  const handleCloseNotification = () => {
    setShowNotification(false);
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
    const getSavedRecipes = () => {
      if (savedRecipesFromLocalStorage) {
        setSavedRecipes(JSON.parse(savedRecipesFromLocalStorage));
      }
    };

    getRecipes();
    getSavedRecipes();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Box>
        <Navbar />
        <RecipeNotification 
          open={showNotification}
          message={notificationMessage}
          onClose={handleCloseNotification}
        />
        <Container maxWidth={false} sx={{ py: 4 }}>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ flexDirection: "row", gap: 3 }}
          >
            {categories.map((category: { strCategory: string; }) => (
              <Filter
                key={category.strCategory}
                strCategory={category.strCategory}
                isActive={selectedCategory === category.strCategory}
                onClick={() => handleCategoryClick(category.strCategory)} />
            ))}
          </Box>
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} sx={{ mt: 2 }}>
            {recipes.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.idMeal} onClick={() => handleSaveClick(recipe)} />
            ))}
          </Box>
        </Container>
      </Box>
   );
  } 
};
export default Home;