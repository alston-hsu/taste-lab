import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, IconButton, CardActionArea } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from 'react-router-dom';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <Card sx={{ width: '100%', maxWidth: 300, height: 300, m: 2 }}>
      <CardActionArea component={Link} to={`/recipe/${recipe.idMeal}`}>
        <CardMedia
          component="img"
          height="140"
          image={recipe.strMealThumb}
          alt={recipe.strMeal}
          sx={{ '&:hover': { transform: 'scale(1.05)', transition: '0.3s' } }}
        />
      </CardActionArea>  
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div">
              {recipe.strMeal}
            </Typography>
            <IconButton
              onClick={onClick}
            >
              <FavoriteBorderIcon color="action" />
            </IconButton>
          </Box>
        </CardContent>
    </Card>
  );
}
export default RecipeCard;