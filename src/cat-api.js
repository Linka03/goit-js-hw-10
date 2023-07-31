// cat-api.js
import axios from 'axios';

const API_KEY =
  'live_Q3NSCk8xAQPL0tXYzwK1VeHZpVE7RLyxGprBRMzfYt4cre3BLbJgOY778Vf50ibV';
axios.defaults.headers.common['x-api-key'] = API_KEY;

export const fetchBreeds = function () {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
};

export const fetchCatByBreed = function (breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
};



