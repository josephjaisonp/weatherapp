import React from 'react';
type Coordinates = {
    lon: number;
    lat: number;
  };
  
  // Components type
  type AirQualityComponents = {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
  
  
  type AirQualityListItem = {
    main: {
      aqi: number;
    };
    components: AirQualityComponents;
    dt: number;
  };
  
  // Main 
  type AirQualityData = {
    coord: Coordinates;
    list: AirQualityListItem[];
  };

interface ForecastPollutionCardProps {
    forecastPollution: AirQualityData |null;
}


const getAQIColor = (aqi: number) => {
    if (aqi === 1) return 'bg-green-600'; 
    if (aqi === 2) return 'bg-yellow-500'; 
    if (aqi === 3) return 'bg-orange-500'; 
    if (aqi === 4) return 'bg-red-500'; 
    if (aqi === 5) return 'bg-purple-500'; 
    return 'bg-gray-500'; 
};

const getAQIDescription = (aqi: number) => {
    if (aqi === 1) return 'Green (Good)';
    if (aqi === 2) return 'Yellow (Fair)';
    if (aqi === 3) return 'Orange (Moderate)';
    if (aqi === 4) return 'Red (Poor)';
    if (aqi === 5) return 'Purple (Hazardous)';
    return 'Unknown AQI';
};

const ForecastPollutionCard: React.FC<ForecastPollutionCardProps> = ({ forecastPollution }) => {
    if (!forecastPollution) return null;
   // console.log("forecastpollution",forecastPollution);
    

    return (
        <div className="bg-slate-200 p-4 mt-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700">Forecast Pollution</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                {forecastPollution.list.slice(0,5).map((item, index: number) => (
                    <div 
                        key={index} 
                        className={`p-2 rounded-lg ${getAQIColor(item.main.aqi)}`}
                    >
                        <p>Date: {new Date(item.dt* 1000).toLocaleDateString()}</p>   
                        <p>AQI: {item.main.aqi} - {getAQIDescription(item.main.aqi)}</p>
                        <p>CO: {item.components.co} µg/m3</p>
                        <p>PM2.5: {item.components.pm2_5} µg/m3</p>
                        <p>PM10: {item.components.pm10} µg/m3</p>
                        <p>o3:{item.components.o3}µg/m3</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForecastPollutionCard;
