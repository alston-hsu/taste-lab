import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import Filter from '../components/Filter';
import { getFoodByCategory, getAllFoodCategories } from '../services/foodService';
import { Recipe } from '../types/Recipe';
import Navbar from '../components/Navbar';
import RecipeNotification from '../components/RecipeNotification';
import Grid from '@mui/material/Grid2';


const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<{ strCategory: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Beef");
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const savedRecipesFromLocalStorage = localStorage.getItem("savedRecipes");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleCategoryClick = async (categoryClicked: string) => {
    setSelectedCategory(categoryClicked);
    const clickedCategoryRecipeData = await getFoodByCategory(categoryClicked);
    setRecipes(clickedCategoryRecipeData);
  };

  const handleSaveClick = (recipe: Recipe) => {
    console.log(localStorage.getItem(recipe.idMeal));
    if (
      savedRecipes.find(
        (savedRecipe: Recipe) => savedRecipe.idMeal === recipe.idMeal
      )
    ) {
      setNotificationMessage("Recipe already saved!");
      setShowNotification((prevShowNotification) => !prevShowNotification);
    } else {
      const updatedSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(updatedSavedRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes));
      setNotificationMessage("Recipe saved!");
      setShowNotification((prevShowNotification) => !prevShowNotification);
    }
  };

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
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
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12 }} sx={{ pb: 1 }}>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                sx={{ flexDirection: "row", gap: 3 }}
              >
                {categories.map((category: { strCategory: string }) => (
                  <Filter
                    key={category.strCategory}
                    strCategory={category.strCategory}
                    isActive={selectedCategory === category.strCategory}
                    onClick={() => handleCategoryClick(category.strCategory)}
                  />
                ))}
              </Box>
            </Grid>
            {recipes.map((recipe) => (
              <Grid 
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={recipe.idMeal}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RecipeCard
                  recipe={recipe}
                  onClick={() => handleSaveClick(recipe)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }
};
export default Home;