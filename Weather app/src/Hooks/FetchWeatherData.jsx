import axios from "axios";

export const fetchWeatherData = async (lat, lon) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const options = {
    method: 'GET',
    url: 'https://api.openweathermap.org/data/3.0/onecall',
    params: {
      lat: lat,
      lon: lon,
      exclude: 'minutely,alerts',
      appid: API_KEY,
      units: 'metric'
    },
  };
  try {
    const response = await axios.request(options);
    const data = await response.data
    return data;

  } catch (error) {
    console.log(error);
  }
}