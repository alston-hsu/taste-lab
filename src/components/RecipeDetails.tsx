import React from "react";
import { 
  Box, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  IconButton,
  Grid,
  Chip,
  Divider 
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  strTags?: string;
  strYoutube?: string;
  strIngredients?: string[];
  strMeasure?: string;
}

interface RecipeDetailsCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeDetails: React.FC<RecipeDetailsCardProps> = ({ recipe, onClick }) => {
  const getIngredientsWithMeasures = (recipe: any) => {
    const ingredients = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measurement = recipe[`strMeasure${i}`];
      
      if (ingredient || measurement) {
        ingredients.push({
          name: ingredient,
          measurement: measurement
        });
      }
    }
    
    return ingredients;
  };

  const ingredientsList = getIngredientsWithMeasures(recipe);
  const space = " ";

  return (
    <Card sx={{ maxWidth: 1200, m: 2, mx: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            image={recipe.strMealThumb}
            alt={recipe.strMeal}
            sx={{ objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h4" component="div">
                {recipe.strMeal}
              </Typography>
              <IconButton
                onClick={onClick}
              >
                <FavoriteBorderIcon color="action" />
              </IconButton>
            </Box>
            
            <Box mb={2}>
              <Chip label={recipe.strCategory} sx={{ mr: 1 }} color="primary" />
              <Chip label={recipe.strArea} sx={{ mr: 1 }} color="secondary" />
              {recipe.strTags?.split(',').map((tag) => (
                <Chip key={tag} label={tag} sx={{ mr: 1 }} variant="outlined" />
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {ingredientsList.map((ingredient, measurement, index) => (
                <div key={index}>{ingredient.measurement}{space}{ingredient.name}</div>
              ))}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {recipe.strInstructions}
            </Typography>

            {recipe.strYoutube && (
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Video Tutorial
                </Typography>
                <iframe
                  width="100%"
                  height="200"
                  src={recipe.strYoutube.replace('watch?v=', 'embed/')}
                  title="Recipe Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );

};

export default RecipeDetails;