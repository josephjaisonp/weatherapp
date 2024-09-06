import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from '../redux/weatherSlice';
import { AppDispatch, RootState } from '../redux/store';

const useWeatherData = (city: string) => {
    const dispatch = useDispatch<AppDispatch>();

    const weather  = useSelector((state: RootState) => state.weather.weather);
    const pollution = useSelector((state: RootState) => state.weather.pollution);
    const forecast = useSelector((state: RootState) => state.weather.forecast);
    const historicalPollution = useSelector((state: RootState) => state.weather.historicalPollution);
    const forecastPollution = useSelector((state: RootState) => state.weather.forecastPollution);
    const isLoading = useSelector((state: RootState) => state.weather.isLoading);
    const error = useSelector((state: RootState) => state.weather.error);

    useEffect(() => {
        if (city) {
            dispatch(fetchWeatherData(city));
        }
    }, [city, dispatch]);

    return { weather, pollution, forecast, historicalPollution, forecastPollution, isLoading, error };
};

export default useWeatherData;
