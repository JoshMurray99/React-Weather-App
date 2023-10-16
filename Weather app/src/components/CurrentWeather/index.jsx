import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import WbSunny from '@mui/icons-material/WbSunnyOutlined';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useState } from 'react';

export default function CurrentWeather({data, city}) {
    const localSunsetUTC = (data.current.sunset + data.timezone_offset - 3600)*1000
    const localSunriseUTC = (data.current.sunrise + data.timezone_offset - 3600)*1000
    const weatherData = {
        temperature: data.current.temp,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        sunrise: new Date(localSunriseUTC).toLocaleTimeString(),
        sunset: new Date(localSunsetUTC).toLocaleTimeString(),
        highTemp: data.daily[0].temp.max,
        lowTemp: data.daily[0].temp.min,
        timezone: data.timezone_offset,
        name: city,
        wicon: data.current.weather[0].icon,
        weather: data.current.weather[0].description,
        lat: data.lat,
        lon: data.lon}

  
    const currentDate = new Date()
    const localTime = new Date(currentDate.getTime() + (weatherData.timezone * 1000)-(3600000))
    const wicon = weatherData.wicon
    const imgurl = `https://openweathermap.org/img/wn/${wicon}@4x.png`
      
  return (
    <>
    <Box sx={{ display: 'flex', mt: 5 }}>
      <Card variant="outlined" sx={{minWidth: 332}}>
      <CardContent>
      <Typography sx={{ fontSize: 18 }}>
        {weatherData.name}
      </Typography>
      <Typography variant="h5" component="div">
        {Math.round(weatherData.temperature)} &deg;C
      </Typography>
      <CardMedia
        component="img"
        height="194"
        image={imgurl}
        alt={weatherData.weather}
      />
      <Typography sx={{ fontSize: 16 }}>
        {weatherData.weather}
      </Typography>
    </CardContent>
      </Card>

      <Card variant='outlined' sx={{minWidth: 332}}>
        <CardContent>
        <Typography variant="h6">
        {localTime.toLocaleDateString()}
        </Typography>
        
        <Typography variant="h6" >
        {localTime.toLocaleTimeString().substring(0,5)}

            </Typography>
            <br/>
            <Typography sx={{fontSize: 14}} color="text.secondary">
                humidity: {weatherData.humidity} %
                <br/>
                wind: {weatherData.windSpeed} m/s
                <br/>
                high: {Math.round(weatherData.highTemp)} &deg;C
                <br/>
                low: {Math.round(weatherData.lowTemp)} &deg;C
            </Typography>
            <br/>
            
            <WbSunny/>
            <ArrowUpward/>
            <Typography sx={{fontSize: 14}} color="text.secondary">
                {weatherData.sunrise.substring(0,5)}
                </Typography>
            <br/><br/>
            <WbSunny/>
            <ArrowDownward/>
            <Typography sx={{fontSize: 14}} color="text.secondary">
            {weatherData.sunset.substring(0,5)}
                </Typography>
            
        </CardContent>
      </Card>
    </Box>
  
    </>
  )
}
