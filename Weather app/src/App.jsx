import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { fetchWeatherData } from '../Hooks/FetchWeatherData';

import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import SearchHistoryTable from './components/SearchHistoryTable';

function App() {
  const [citySearch, setCitySearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('')
  const [cityOptions, setCityOptions] = useState([]);
  const [showList, setShowList] = useState(true);
  const [weatherData, setWeatherData] = useState(null)
  const [searchHistory, setSearchHistory] = useState([]);


  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSelection = (city, state, lon, lat) => {
    setSelectedCity(`${city}, ${state}`); 
    setCitySearch(`${city}, ${state}`); 
    setShowList(false);
    getWeatherData(lat, lon)
  }


  async function getCities() {
    setShowList(true);
    const options = {
      method: 'GET',
      url: 'http://api.openweathermap.org/geo/1.0/direct',
      params: {
        q: `${citySearch}`,
        limit: 5,
        appid: API_KEY,
      },
    };
    try {
      const response = await axios.request(options);
      const cityNames = response.data.map((city) => ({
        name: city.name,
        state: city.state,
        lat: city.lat,
        lon: city.lon
      }));
      setCityOptions(cityNames);
    } catch (error) {
      console.log(error);
    }
  }

  async function getWeatherData(lat, lon) {
    try {
      const data = await fetchWeatherData(lat, lon);
  
      const newSearchEntry = {
        location: citySearch,
        timestamp: new Date(), // Current timestamp
        currentTemp: data.current.temp,
        tempMin: data.daily[0].temp.min,
        tempMax: data.daily[0].temp.max,
      };
  
      setSearchHistory([newSearchEntry, ...searchHistory]); // Add new entry to the beginning of the array
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
        <div className='search'>
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            onChange={(e) => setCitySearch(e.target.value)}
            value={citySearch}
          />
          <Button variant="contained" onClick={getCities}>
            Search
          </Button>
        </div>
        {cityOptions.length > 0 && showList && (
          <List>
            {cityOptions.map((city, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleSelection(city.name, city.state, city.lon, city.lat)}>
                  <ListItemText primary={city.name} secondary={city.state} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        
        {weatherData && (
          <>
          <CurrentWeather data={weatherData} city={selectedCity}/>
          <HourlyForecast data={weatherData}  />
          <DailyForecast data={weatherData} />
          <SearchHistoryTable searchHistoryData={searchHistory} />
          </>
        )}
    </>
  );
}

export default App;
