import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import { fetchWeatherData } from './Hooks/FetchWeatherData';
import { fetchCityNames } from './Hooks/FetchCityNames';

import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import SearchHistoryTable from './components/SearchHistoryTable';

function App() {
  const [citySearch, setCitySearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [showList, setShowList] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSelection = (city, state, lon, lat) => {
    setSelectedCity(`${city}, ${state}`);
    setCitySearch(`${city}, ${state}`);
    setShowList(false);
    getWeatherData(lat, lon);
  }

  async function getCities() {
    setShowList(true);
    try {
      const response = await fetchCityNames(citySearch)
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
        location: citySearch.split(',')[0].trim().toLowerCase(),
        timestamp: new Date(),
        currentTemp: data.current.temp,
        tempMin: data.daily[0].temp.min,
        tempMax: data.daily[0].temp.max,
      };
      setSearchHistory([newSearchEntry, ...searchHistory]);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex' }}>
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
      </Box>

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
          <CurrentWeather data={weatherData} city={selectedCity} />
          <HourlyForecast data={weatherData} />
          <DailyForecast data={weatherData} />
          <SearchHistoryTable searchHistoryData={searchHistory} />
        </>
      )}
    </Box>
  );
}

export default App;

