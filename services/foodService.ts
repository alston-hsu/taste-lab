import axios from 'axios';

const category = 'Beef';
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php';

export const getFoodByCategory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}?c=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching food with ${category} as the category: `, error);
      return null;
    }
}