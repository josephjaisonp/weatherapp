import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = '8e229f88dfe2d5127d2aeef4bed53ba0';

export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (city: string) => {
        const geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        const geoData = await geoRes.json();
       // console.log("httt",geoData)

        if (geoData.length === 0) {
            alert('Invalid city');
        }

        const { lat, lon } = geoData[0];
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const weatherData = await weatherRes.json();
        //console.log("httt",weatherData)


        const pollutionRes = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const pollutionData = await pollutionRes.json();
        //console.log("httt",pollutionData)


        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const forecastData = await forecastRes.json();
       //console.log("httt",forecastData)


        const endDate = Math.floor(Date.now() / 1000);
        const startDate = endDate - 7 * 24 * 60 * 60;
        const historicalRes = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${startDate}&end=${endDate}&appid=${API_KEY}`);
        const historicalData = await historicalRes.json();
        //console.log("httt",historicalData)

        const forecastPollutionRes = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const forecastPollutionData = await forecastPollutionRes.json();
        //console.log("httt",forecastPollutionData)

        return {
            weather: weatherData,
            pollution: pollutionData,
            forecast: forecastData,
            historicalPollution: historicalData,
            forecastPollution: forecastPollutionData,
        };
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: null,
        pollution: null,
        forecast: null,
        historicalPollution: null,
        forecastPollution: null,
        isLoading: false,
        error: " ",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.weather = action.payload.weather;
                state.pollution = action.payload.pollution;
                state.forecast = action.payload.forecast;
                state.historicalPollution = action.payload.historicalPollution;
                state.forecastPollution = action.payload.forecastPollution;
                state.isLoading = false;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "";
            });
    },
});

export default weatherSlice.reducer;