import React, { useEffect, useState } from 'react';
import Loader from './UI/Loader';

// specific types 
interface Weather {
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number; 
}

interface Wind {
    speed: number;
}

interface Precipitation {
    '3h': number; 
}

interface ForecastItem {
    dt_txt: string;
    weather: Weather[];
    main: Main;
    wind: Wind;
    rain?: Precipitation; 
    snow?: Precipitation; 
    thunderstorm?: Precipitation; 
}

interface Forecast {
    list: ForecastItem[];
}

interface ForecastCardProps {
    forecast: Forecast | null;
    
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
    const [visibleItems, setVisibleItems] = useState(5); 
    const [isLoading, setIsLoading] = useState(false); 

    const loadMoreItems = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleItems((prev) => prev + 5); 
            setIsLoading(false);
        }, 1000); 
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLoading) {
                loadMoreItems();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    
    if (!forecast) return <div className="p-4">No forecast data available.</div>;

    return (
        <div className="bg-purple-500 p-4 mt-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">Weather Forecast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                {forecast.list.slice(0, visibleItems).map((item, index) => {
                    //  thunderstorm data 
                    const isThunderstorm = item.weather.some(w => w.description.toLowerCase().includes('thunderstorm'));
                    
                    const isHighRain = item.rain && item.rain['3h'] >= 10;

                    return (
                        <div
                            key={index}
                            className={`p-4 rounded-lg text-white text-center shadow-md ${
                                isThunderstorm ? 'bg-gray-800' : isHighRain ? 'bg-red-700' : 'bg-purple-700'
                            }`}
                        >
                            <p className="text-lg font-semibold">{new Date(item.dt_txt).toLocaleString()}</p>
                            <img
                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                                className="mx-auto my-2 w-16 h-16"
                            />
                            <p className="text-sm">{item.weather[0].description}</p>
                            <p className="text-xl font-bold">{Math.round(item.main.temp)}°C</p>
                            <p>Feels like: {Math.round(item.main.feels_like)}°C</p>
                            <p>Humidity: {item.main.humidity}%</p>
                            <p>Pressure: {item.main.pressure} hPa</p>
                            <p>Wind Speed: {item.wind.speed} m/s</p>
                            {item.rain && (
                                <>
                                    <p>Precipitation: {item.rain['3h']} mm</p>
                                    {isHighRain && <p className="text-red-300 font-bold">High Rain Alert!</p>}
                                </>
                            )}
                            {item.snow && <p>Snow: {item.snow['3h']} mm</p>}
                            {item.thunderstorm && <p>Thunderstorm: {item.thunderstorm['3h']} mm</p>}
                        </div>
                    );
                })}
            </div>
            {isLoading && <div className="text-white text-center mt-4 bg-purple-500"><Loader theme={""} /></div>}
        </div>
    );
}

export default ForecastCard;
