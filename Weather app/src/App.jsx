import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const API_KEY = import.meta.env.API_KEY
  const cityName = 'London'
  console.log(API_KEY)

  async function getWeather() {
    const options = {
      method: 'GET',
      url: 'http://api.openweathermap.org/geo/1.0/direct',
      params: {
      q: `${cityName}`,
      limit: 1,
      appid: API_KEY,
    },
  }

  try {
    const response = await axios.request(options);
    console.log(response.data)
  }
  catch(error){
    console.log(error);
  }
}

// useEffect(() => {
//   getWeather()
// }, [])

  return (
    <>
      <div>
     Hi
      </div>
      
    </>
  )
}

export default App
