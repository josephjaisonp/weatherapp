import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import WeatherMap from './Pages/WeatherMap';
const App: React.FC = () => {
    
    const [theme, setTheme] = useState('light');
    

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <>
        
        <Router>
            <Routes>
                <Route path="/" element={<Home  theme={theme} toggleTheme={toggleTheme}  />} />
                <Route path="/weathermap" element={<WeatherMap />} />
            </Routes>
        </Router>
        </>
    );
};

export default App;
