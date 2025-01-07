'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import WeatherDisplay from '../components/WeatherDisplay'
import Forecast from '../components/Forecast'

export default function WeatherApp() {
  const [city, setCity] = useState('London')
  const [weatherData, setWeatherData] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    fetchWeather()
  }, [city])

  const fetchWeather = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      if (!currentWeatherResponse.ok) {
        throw new Error('Failed to fetch current weather data')
      }
      const currentWeatherData = await currentWeatherResponse.json()
      setWeatherData(currentWeatherData)

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      )
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data')
      }
      const forecastData = await forecastResponse.json()
      setForecast(forecastData)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setWeatherData(null)
      setForecast(null)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">SeasonalStory</h1>
          <Button onClick={toggleDarkMode} variant="outline" size="icon">
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={fetchWeather}>Search</Button>
            </div>
          </CardContent>
        </Card>
        {weatherData ? <WeatherDisplay data={weatherData} /> : <p>No weather data available</p>}
        {forecast ? <Forecast data={forecast} /> : <p>No forecast data available</p>}
      </div>
    </div>
  )
}

