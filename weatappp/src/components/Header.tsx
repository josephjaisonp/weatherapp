import React, { useEffect, useState } from "react";
import Login from "./Login";
import { CloudSun, MapPinned } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { DropdownComponent } from "./DropdownComponent";
import { useNavigate } from "react-router-dom";
import { WeatherData } from "./WeatherType";

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
  weather: WeatherData | null; 
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme, weather }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleWeatherMap = () => {
    navigate("/WeatherMap");
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  const weatherBackgrounds: { [key: string]: string } = {
    Clear: "url('https://i.gifer.com/origin/f4/f437524b815d9d77d659da4c3a0a9213_w200.webp')",
    Clouds: "url('https://i.makeagif.com/media/7-15-2016/0huESp.gif')",
    Rain: "url('https://i.gifer.com/E3K8.gif')",
    Snow: "url('https://68.media.tumblr.com/f6a4004f3092b0d664daeabb95d5d195/tumblr_oduyciOJNb1uhjffgo1_500.gif')",
    Thunderstorm: "url('https://i.pinimg.com/originals/5d/f1/00/5df100f0376f430ee018c047a78d7d35.gif')",
    Mist: "url('https://68.media.tumblr.com/f6a4004f3092b0d664daeabb95d5d195/tumblr_oduyciOJNb1uhjffgo1_500.gif')",
    Haze:"url('https://64.media.tumblr.com/f13653500e6d68b49f7b3c62501def5a/tumblr_pmd6e6Ol7y1runoqyo7_r1_540.gif')"
   
    
  };

  const backgroundImage =
    weather && weather.weather[0].main
      ? weatherBackgrounds[weather.weather[0].main]
      : weatherBackgrounds.Clear;

  const element: React.CSSProperties = {
    color: "#606F7B",
    backgroundColor: "rgb(165, 182, 198)",
    backgroundImage: backgroundImage,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <header
      className="container text-center bg-grey-lightest mx-auto shadow rounded pb-4 py-6 bg-cover"
      style={element}
    >
      <div className="flex-col justify-between items-center">
        {!isAuthenticated ? (
          <div className="flex flex-wrap mr-12 w-full justify-end">
            <Login />
          </div>
        ) : (
          <div className="text-black flex w-full justify-end pr-5">
            <DropdownComponent />
          </div>
        )}
        <div className="flex justify-center">
          <h1 className="text-4xl font-extrabold text-white flex justify-center">
            WeatherVista
          </h1>
          <CloudSun size={40} color="white"/>
        </div>
        <p className="text-xl text-white mt-2 ">{currentTime.toLocaleString()}</p>
        <p className="text-lg text-white">{dayOfWeek}</p>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex text-white hover:-translate-y-2 duration-500 font-bold justify-start pl-5 cursor-pointer " onClick={handleWeatherMap}><MapPinned className="size-10"/></div>
        <div className="justify-end  px-5 ">
          <button
            onClick={toggleTheme}
            className={`p-1 ${
              theme === "dark"
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-800 text-gray-200"
            } rounded-full shadow-lg focus:outline-none`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        </div>
    </header>
  );
};

export default Header;
