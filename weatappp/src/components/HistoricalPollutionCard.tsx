import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

type Coordinates = {
    lon: number;
    lat: number;
  };
  
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
  
  
  type AirQualityData = {
    coord: Coordinates;
    list: AirQualityListItem[];
  };


interface HistoricalPollutionCardProps {
    historicalPollution: AirQualityData|null;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HistoricalPollutionCard: React.FC<HistoricalPollutionCardProps> = ({ historicalPollution }) => {
    if (!historicalPollution) return null;
    //console.log("historicalpollution",historicalPollution);

    const dates = historicalPollution.list.map((item) =>
        new Date(item.dt * 1000).toLocaleDateString()
    );

    const aqiData = historicalPollution.list.map((item) => item.main.aqi);
    const coData = historicalPollution.list.map((item) => item.components.co);
    const pm25Data = historicalPollution.list.map((item) => item.components.pm2_5);
    const pm10Data = historicalPollution.list.map((item) => item.components.pm10);

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'AQI',
                data: aqiData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                fill: false,
            },
            {
                label: 'CO (µg/m3)',
                data: coData,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                fill: false,
            },
            {
                label: 'PM2.5 (µg/m3)',
                data: pm25Data,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                fill: false,
            },
            {
                label: 'PM10 (µg/m3)',
                data: pm10Data,
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Historical Air Quality',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Dates', 
                },
            },
            y: {
                beginAtZero: true, 
                title: {
                    display: true,
                    text: 'Values (AQI, CO, PM2.5, PM10)', 
                },
                ticks: {
                    callback: function (tickValue: number | string) {
                        if (typeof tickValue === 'number') {
                            return tickValue.toFixed(0); 
                        }
                        return tickValue; 
                    },
                },
            },
        },
    };
    

    return (
        <div className="bg-white p-4 mt-4 rounded-lg shadow-lg">
            <h2 className="text-2xl text-black font-bold">Historical Air Quality</h2>
            <div className="mt-1">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

export default HistoricalPollutionCard;

