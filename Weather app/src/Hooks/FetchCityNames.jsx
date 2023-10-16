import axios from "axios";

export const fetchCityNames = async (city) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const options = {
    method: 'GET',
    url: 'https://api.openweathermap.org/geo/1.0/direct',
    params: {
      q: `${city}`,
      limit: 5,
      appid: API_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    return response;

  } catch (error) {
    console.log(error);
  }
}

