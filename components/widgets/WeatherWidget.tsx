
import React, { useState, useEffect } from 'react';
import { CloudRain, Cloud, Sun, CloudSnow, CloudDrizzle, CloudLightning, MapPin } from 'lucide-react';

interface WeatherData {
  temperature: number;
  weatherCode: number;
  isLoading: boolean;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 12,
    weatherCode: 61,
    isLoading: true
  });

  const fetchWeather = async () => {
    try {
      // Vancouver coordinates: 49.2827° N, 123.1207° W
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=49.2827&longitude=-123.1207&current=temperature_2m,weather_code&temperature_unit=celsius'
      );
      const data = await response.json();

      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      setWeather(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchWeather();
    // Update every hour
    const interval = setInterval(fetchWeather, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number) => {
    // WMO Weather interpretation codes
    if (code === 0) return { icon: Sun, text: 'Clear', color: 'text-yellow-500' };
    if (code <= 3) return { icon: Cloud, text: 'Cloudy', color: 'text-gray-500' };
    if (code <= 48) return { icon: Cloud, text: 'Foggy', color: 'text-gray-400' };
    if (code <= 57) return { icon: CloudDrizzle, text: 'Drizzle', color: 'text-blue-400' };
    if (code <= 67) return { icon: CloudRain, text: 'Rainy', color: 'text-blue-600' };
    if (code <= 77) return { icon: CloudSnow, text: 'Snow', color: 'text-blue-300' };
    if (code <= 82) return { icon: CloudRain, text: 'Showers', color: 'text-blue-700' };
    if (code <= 86) return { icon: CloudSnow, text: 'Snow Showers', color: 'text-blue-200' };
    if (code <= 99) return { icon: CloudLightning, text: 'Thunderstorm', color: 'text-purple-600' };
    return { icon: Cloud, text: 'Unknown', color: 'text-gray-500' };
  };

  const weatherInfo = getWeatherIcon(weather.weatherCode);
  const WeatherIcon = weatherInfo.icon;

  return (
    <div className="w-[250px] bg-white/60 backdrop-blur-md border border-white/50 rounded-xl shadow-2xl p-6 flex flex-col items-center pointer-events-auto hover:bg-white/80 transition-colors cursor-default select-none">
      <div className="flex items-center gap-2 text-gray-800 text-lg font-bold uppercase tracking-wider mb-4">
        <MapPin size={20} />
        <span>Vancouver</span>
      </div>

      <div className="flex flex-col items-center">
        <WeatherIcon size={100} className={`${weatherInfo.color} drop-shadow-xl mb-2`} />
        <span className="text-7xl font-bold text-gray-900 leading-none">
          {weather.isLoading ? '--' : weather.temperature}°
        </span>
        <span className="text-2xl text-gray-800 font-medium mt-2">{weatherInfo.text}</span>
      </div>
    </div>
  );
};
export default WeatherWidget;
