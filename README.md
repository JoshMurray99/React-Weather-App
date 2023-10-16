# React + Material UI Weather App

[Deployed app](https://main--elaborate-genie-7e1be1.netlify.app/)

## How to use

Enter any city/town and you will be able to view the current weather, hourly forecast and daily forecast. Each time you perform a search, it will be logged in the search history table which is grouped by location. Just click on one of the locations and it will expand to show details of previous searches.

# API

This app uses the OpenWeatherMap, using the One Call API to retreive forecast data, and the Geocoding API to get the longitude and latitude coordinates for the search query.

[openweathermap](https://openweathermap.org/)

# Challenges

I started out writing the code for the current weather, and once I got to the forecast section realised I could just use the one call API to get all of the data I needed (I used the current weather API at first for the current weather). This meant I ended up having some difficulty re-organizing my code and components.
I definitely learned the importance of planning out file structure in advance, which helps a lot to keep clean, maintainable code. 
