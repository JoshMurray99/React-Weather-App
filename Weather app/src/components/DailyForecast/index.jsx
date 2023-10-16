import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function DailyForecast({data}) {

    const next5Days = data.daily.slice(0, 5).map((dailyItem) => ({
        day: new Date(dailyItem.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
        }),
        temp: dailyItem.temp.day,
        icon: dailyItem.weather[0].icon,
        maxTemp: dailyItem.temp.max,
        minTemp: dailyItem.temp.min,
    }));
    return (
        <div>
        <Box sx={{ display: 'flex', mt: 2 }}>
          {next5Days.map((day, index) => (
            <Grid key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {day.day}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="100"
                    image={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={`Weather icon for the day`}
                  />
                  <Typography variant="h6">
                    {Math.round(day.temp)} °C
                  </Typography>
                  <Typography variant="subtitle1">
                    Max: {Math.round(day.maxTemp)} °C
                  </Typography>
                  <Typography variant="subtitle1">
                    Min: {Math.round(day.minTemp)} °C
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Box>
      </div>
    )
}
