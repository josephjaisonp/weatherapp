import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import axios from 'axios';

const WeatherMap: React.FC = () => {
    const mapElement = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<Map | null>(null);
    const [selectedLayer, setSelectedLayer] = useState<string>('clouds_new');
    const [zoomLevel, setZoomLevel] = useState<number>(3);
    const [city, setCity] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (mapElement.current && !mapRef.current) {
            mapRef.current = new Map({
                target: mapElement.current,
                layers: [
                    new TileLayer({ source: new OSM() }),
                    new TileLayer({
                        source: new XYZ({
                            url: `https://tile.openweathermap.org/map/${selectedLayer}/{z}/{x}/{y}.png?appid=8e229f88dfe2d5127d2aeef4bed53ba0`,
                        }),
                    }),
                ],
                view: new View({
                    center: fromLonLat([0, 0]),
                    zoom: zoomLevel,
                }),
            });

            const weatherLayer = mapRef.current.getLayers().item(1) as TileLayer;
            const source = weatherLayer.getSource() as XYZ;
            source.on('tileloaderror', (event) => {
                console.error('Tile load error:', event);
            });
        }
    }, [selectedLayer, zoomLevel]);

    const handleLayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const layer = event.target.value;
        setSelectedLayer(layer);
        if (mapRef.current) {
            const weatherLayer = mapRef.current.getLayers().item(1) as TileLayer;
            const source = weatherLayer.getSource() as XYZ;
            source.setUrl(`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=8e229f88dfe2d5127d2aeef4bed53ba0`);
        }
    };

    const handleZoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const zoom = parseInt(event.target.value, 10);
        setZoomLevel(zoom);
        if (mapRef.current) {
            mapRef.current.getView().setZoom(zoom);
        }
    };

    const handleCitySearch = async () => {
        if (city) {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8e229f88dfe2d5127d2aeef4bed53ba0`);
                const { coord } = response.data;
                if (mapRef.current) {
                    mapRef.current.getView().setCenter(fromLonLat([coord.lon, coord.lat]));
                    mapRef.current.getView().setZoom(zoomLevel);
                }
                setError(null);
            } catch (error) {
                console.error('Error fetching city data:', error);
                setError('City not found');
            }
        }
    };

    return (
        <div className="relative">
            <div ref={mapElement} className="w-full h-screen"></div>
            <div className="absolute top-2 left-8 z-10 bg-white p-4 rounded shadow-lg">
                <select
                    onChange={handleLayerChange}
                    value={selectedLayer}
                    className="mb-2 border border-gray-300 rounded p-2"
                >
                    <option value="clouds_new">Clouds</option>
                    <option value="precipitation_new">Precipitation</option>
                    <option value="pressure_new">Pressure</option>
                    <option value="wind_new">Wind</option>
                    <option value="temp_new">Temperature</option>
                </select>

                <select
                    onChange={handleZoomChange}
                    value={zoomLevel}
                    className="mb-2 border border-gray-300 rounded p-2"
                >
                    <option value={2}>Zoom Level 2</option>
                    <option value={3}>Zoom Level 3</option>
                    <option value={4}>Zoom Level 4</option>
                    <option value={5}>Zoom Level 5</option>
                    <option value={6}>Zoom Level 6</option>
                    <option value={7}>Zoom Level 7</option>
                    <option value={8}>Zoom Level 8</option>
                    <option value={9}>Zoom Level 9</option>
                </select>

                <div className="mb-2">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    <button
                        onClick={handleCitySearch}
                        className="mt-2 bg-blue-800 text-white rounded p-2 w-full"
                    >
                        Search
                    </button>
                </div>

                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
        </div>
    );
};

export default WeatherMap;
