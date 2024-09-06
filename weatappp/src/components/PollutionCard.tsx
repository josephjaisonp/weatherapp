import React from 'react';
type Coordinates = {
    lon: number;
    lat: number;
  };
  
  // Air Quality Components type
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
  
  // Air Quality List type
  type AirQualityListItem = {
    main: {
      aqi: number;
    };
    components: AirQualityComponents;
    dt: number;
  };
  
  // Main Data type
  type AirQualityData = {
    coord: Coordinates;
    list: AirQualityListItem[];
  };

interface PollutionCardProps {
    pollution: AirQualityData | null;
}

const PollutionCard: React.FC<PollutionCardProps> = ({ pollution }) => {
    if (!pollution) return null;

    const aqi = pollution.list[0].main.aqi;

    const getAQIColor = (aqi: number) => {
        switch (aqi) {
            case 1:
                return 'bg-green-500'; 
            case 2:
                return 'bg-yellow-500'; 
            case 3:
                return 'bg-orange-500'; 
            case 4:
                return 'bg-red-500'; 
            case 5:
                return 'bg-purple-500'; 
            default:
                return 'bg-gray-500'; 
        }
    };

    const getAQILabel = (aqi: number) => {
        switch (aqi) {
            case 1:
                return 'Good';
            case 2:
                return 'Fair';
            case 3:
                return 'Moderate';
            case 4:
                return 'Poor';
            case 5:
                return 'Hazardous';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className={`p-4 mt-4 rounded-lg shadow-lg ${getAQIColor(aqi)}`}>
            <h2 className="text-2xl font-bold">Air Quality Index</h2>
            <p>{`AQI: ${aqi} (${getAQILabel(aqi)})`}</p>
            <p>{`CO: ${pollution.list[0].components.co} µg/m3`}</p>
            <p>{`PM2.5: ${pollution.list[0].components.pm2_5} µg/m3`}</p>
            <p>{`PM10: ${pollution.list[0].components.pm10} µg/m3`}</p>
        </div>
    );
}

export default PollutionCard;
