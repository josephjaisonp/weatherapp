import React from "react";
import { Icon } from "react-icons-kit";
import { sun, cloud, cloudRain} from "react-icons-kit/feather";
import { WeatherData } from "./WeatherType";
interface WeatherCardProps {
  weather: WeatherData | null;
  
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  //console.log("we",weather)
  if (!weather) return null;
  

  const weatherIcon =
    weather.weather[0].main === "Rain"
      ? cloudRain
      : weather.weather[0].main === "Clouds"
      ? cloud
      : sun;
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();
  // const precipitation = weather.rain?.["1h"] || weather.snow?.["1h"] || 0; // Precipitation in mm for the last hour
  // //console.log("state",weather.state, weather);
  
  
  return (
    <>
    <div className="bg-blue-600 p-6 mt-4 text-white border-4  border-blue-500 rounded-lg shadow-xl sm:h-[360px] transform transition duration-300 hover:scale-105">
      <div className="flex flex-wrap items-center">
        <Icon icon={weatherIcon} size={64} className="text-yellow-300" />
        <div className="ml-6">
          <h2 className="text-3xl font-semibold w-full">{weather.name},{weather.sys.country}</h2>
          <div className="flex gap-6">
            <p className="text-lg mt-2 capitalize">
              {weather.weather[0].description}
            </p>
            <p className="text-2xl mt-4">{Math.round(weather.main.temp)}°C</p>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div>
              <p className="mt-2">🌅 Sunrise: {sunrise}</p>
              <p>🌇 Sunset: {sunset}</p>
            </div>
            <div>
              <p className="mt-4">💨 Wind Speed: {weather.wind.speed} m/s</p>
              <p>🌬️ Pressure: {weather.main.pressure} hPa</p>
            </div>
            <div className="mt-4">
                <p>📍 Longitude: {weather.coord.lon}</p>
                  <p>📍 Latitude: {weather.coord.lat}</p>
                 </div>
            <div>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌡️ Feels Like: {Math.round(weather.main.feels_like)}°C</p>
              <p>🌬️ Wind Direction: {weather.wind.deg}°</p>
              {/* <p className="mt-2">
                🌧️ Precipitation (last hour): {precipitation} mm
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WeatherCard;
