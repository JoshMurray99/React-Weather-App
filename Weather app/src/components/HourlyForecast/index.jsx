import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Grid, Box } from '@mui/material';

export default function HourlyForecast({ data }) {
    const next5Hours = data.hourly.slice(0, 5).map((hourlyItem) => ({
        time: new Date((hourlyItem.dt + data.timezone_offset - 3600) * 1000).toLocaleTimeString(),
        temp: hourlyItem.temp,
        icon: hourlyItem.weather[0].icon,
    }));

    return (
        <div>

            <Box sx={{ display: 'flex', mt: 4 }}>

                {next5Hours.map((hour, index) => (
                    <Grid key={index} >
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {hour.time.slice(0, 5)}
                                </Typography>

                                <CardMedia
                                    component="img"
                                    height="100"
                                    image={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                                    alt={`Weather icon for the hour`}
                                />
                                <Typography variant="h6">
                                    {Math.round(hour.temp)} °C
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Box>
        </div>

    )
}
