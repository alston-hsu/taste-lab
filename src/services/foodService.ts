import axios from 'axios';

const category = 'Beef';
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const getFoodByCategory = async (selectedCategory: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?c=${selectedCategory}`);
      var data = response.data;
      data = data.meals;
      //console.log(data);
      return data;
    } catch (error) {
      console.error(`Error fetching food with ${category} as the category: `, error);
      return null;
    }
}

export const getAllFoodCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/list.php?c=list`);
    var data = response.data;
    data = data.meals;
    //console.log(data);
    return data;
  } catch (error) {
    console.error(`Error fetching all food categories: `, error);
    return null;
  }
}

export const getRecipeByID = async (selectedRecipeID: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${selectedRecipeID}`);
    var data = response.data;
    data = data.meals[0];
    //console.log(data);
    return data;
  } catch (error) {
    console.error(`Error fetching recipe ${selectedRecipeID}: `, error);
    return null;
  }
}