import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Header from './Header';
import useWeatherData from '../hooks/useWeatherData';
import WeatherCard from './WeatherCard';
import PollutionCard from './PollutionCard';
import ForecastCard from './ForecastCard';
import HistoricalPollutionCard from './HistoricalPollutionCard';
import ForecastPollutionCard from './ForecastPollutionCard';
import Loader from './UI/Loader';
import { CloudSunRain, Factory, History, SunSnow, TrendingUpDown} from 'lucide-react';

interface HomeProps {
    theme: string;
    toggleTheme: () => void;
   
    
}

const Home: React.FC<HomeProps> = ({ theme, toggleTheme }) => {
    const [city, setCity] = useState('');
    const [isClicked, setIsClicked] = useState('weather');
    const { weather, pollution, forecast, historicalPollution, forecastPollution, isLoading } = useWeatherData(city || "");
    return (
        <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-black to-black text-white' : 'bg-slate-50 text-white'}  min-w-screen min-h-screen `}>
            <Header toggleTheme={toggleTheme} theme={theme} weather={weather} />
            <div className="container mx-auto p-4">
                <SearchBar setCity={setCity} />

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <Link to="" className="transform transition-transform duration-300 hover:scale-105">
                        <button className={`w-full p-4 gap-2 flex justify-center ${isClicked === "weather" ? "bg-blue-600" : (theme === 'dark' ? 'bg-black border-2 border-white text-white' : 'bg-slate-300 text-slate-800')} rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400`} onClick={() => setIsClicked('weather')}>
                            Weather <CloudSunRain />
                        </button>
                    </Link>
                    <Link to="" className="transform transition-transform duration-300 hover:scale-105">
                        <button className={`w-full p-4 flex gap-2 justify-center ${isClicked === "pollution" ? "bg-blue-600" : (theme === 'dark' ? 'bg-black border-2 border-white text-white' : 'bg-slate-300 text-slate-800')} rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400`} onClick={() => setIsClicked('pollution')}>
                            Pollution <Factory />
                        </button>
                    </Link>
                    <Link to="" className="transform transition-transform duration-300 hover:scale-105">
                        <button className={`w-full p-4 flex gap-2 justify-center ${isClicked === "forecast" ? "bg-purple-700" : (theme === 'dark' ? 'bg-black border-2 border-white text-white' : 'bg-slate-300 text-slate-800')} rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400`} onClick={() => setIsClicked('forecast')}>
                            Forecast<SunSnow />
                        </button>
                    </Link>
                    <Link to="" className="transform transition-transform duration-300 hover:scale-105">
                        <button className={`w-full p-4 gap-2 flex justify-center ${isClicked === "historical" ? "bg-blue-600" : (theme === 'dark' ? 'bg-black border-2 border-white text-white' : 'bg-slate-300 text-slate-800')} rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400`} onClick={() => setIsClicked('historical')}>
                            Historical Pollution<History />
                        </button>
                    </Link>
                    <Link to="" className="transform transition-transform duration-300 hover:scale-105">
                        <button className={`w-full p-4 flex gap-2 justify-center ${isClicked === "forecast pollution" ? "bg-blue-600" : (theme === 'dark' ? 'bg-black border-2 border-white text-white' : 'bg-slate-300 text-slate-800')} rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400`} onClick={() => setIsClicked('forecast pollution')}>
                            Forecast Pollution   <TrendingUpDown />
                        </button>
                    </Link>
                </div>
                <div className="mt-8">
                    {isLoading ? (
                        <div className="flex justify-center min-h-[400px]"><Loader theme={theme} /></div>
                    ) : (
                        <>
                            {isClicked === 'weather' && <WeatherCard weather={weather} />}
                            {isClicked === 'pollution' && <PollutionCard pollution={pollution} />}
                            {isClicked === 'forecast' && <ForecastCard forecast={forecast} />}
                            {isClicked === 'historical' && <HistoricalPollutionCard historicalPollution={historicalPollution} />}
                            {isClicked === 'forecast pollution' && <ForecastPollutionCard forecastPollution={forecastPollution} />}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
