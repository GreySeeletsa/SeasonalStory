import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react'

const WeatherDisplay = ({ data }: { data: any }) => {
  if (!data || !data.main || !data.weather || !data.weather[0]) {
    return (
      <Card className="mb-8">
        <CardContent className="pt-6">
          <p>Weather data is not available. Please try again.</p>
        </CardContent>
      </Card>
    )
  }

  const getWeatherIcon = (weatherCode: string) => {
    switch (weatherCode) {
      case '01d':
      case '01n':
        return <Sun className="w-16 h-16 text-yellow-400" />
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <Cloud className="w-16 h-16 text-gray-400" />
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <CloudRain className="w-16 h-16 text-blue-400" />
      case '11d':
      case '11n':
        return <CloudLightning className="w-16 h-16 text-yellow-600" />
      case '13d':
      case '13n':
        return <CloudSnow className="w-16 h-16 text-blue-200" />
      case '50d':
      case '50n':
        return <Wind className="w-16 h-16 text-gray-300" />
      default:
        return <Sun className="w-16 h-16 text-yellow-400" />
    }
  }

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {data.name}
              {data.sys && data.sys.country ? `, ${data.sys.country}` : ''}
            </h2>
            <p className="text-5xl font-bold mb-4">{Math.round(data.main.temp)}°C</p>
            <p className="text-xl capitalize">{data.weather[0].description}</p>
          </div>
          <div>
            {getWeatherIcon(data.weather[0].icon)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-sm text-muted-foreground">Feels like</p>
            <p className="text-xl font-semibold">{Math.round(data.main.feels_like)}°C</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="text-xl font-semibold">{data.main.humidity}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Wind speed</p>
            <p className="text-xl font-semibold">{data.wind ? `${data.wind.speed} m/s` : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pressure</p>
            <p className="text-xl font-semibold">{data.main.pressure} hPa</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherDisplay

