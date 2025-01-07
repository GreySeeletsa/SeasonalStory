import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from 'lucide-react'

const Forecast = ({ data }) => {
  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
      case '01n':
        return <Sun className="w-8 h-8 text-yellow-400" />
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <Cloud className="w-8 h-8 text-gray-400" />
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <CloudRain className="w-8 h-8 text-blue-400" />
      case '11d':
      case '11n':
        return <CloudLightning className="w-8 h-8 text-yellow-600" />
      case '13d':
      case '13n':
        return <CloudSnow className="w-8 h-8 text-blue-200" />
      case '50d':
      case '50n':
        return <Wind className="w-8 h-8 text-gray-300" />
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />
    }
  }

  const getDayOfWeek = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date(date).getDay()]
  }

  const dailyForecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 5)

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-2xl font-bold mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-4">
          {dailyForecast.map((day, index) => (
            <div key={index} className="text-center">
              <p className="font-semibold mb-2">{getDayOfWeek(day.dt_txt)}</p>
              {getWeatherIcon(day.weather[0].icon)}
              <p className="mt-2">{Math.round(day.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Forecast

