import axios from 'axios';

const category = 'Beef';
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php';

export const getFoodByCategory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?c=${category}`);
      var data = response.data;
      data = data.meals;
      //console.log(data);
      return data;
    } catch (error) {
      console.error(`Error fetching food with ${category} as the category: `, error);
      return null;
    }
}