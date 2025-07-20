import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faCloudRain, faSnowflake, faSmog, faCloudShowersHeavy } from "@fortawesome/free-solid-svg-icons";

interface CurrentWeather {
  temperature: number; // in °C from the API
  weathercode: number; // code for icon mapping
}

export default function Weather() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=40.4406&longitude=-79.9959&current_weather=true&timezone=auto")
      .then((r) => r.json())
      .then((data) => setWeather(data.current_weather))
      .catch((err) => {
        console.error("Weather fetch failed", err);
      });
  }, []);

  if (!weather) {
    return (
      <div id="weather" className="text-white">
        Loading weather…
      </div>
    );
  }

  // Convert °C to °F
  const tempF = Math.round((weather.temperature * 9) / 5 + 32);

  // Map Open-Meteo weather codes to emojis
  const codeMap: Record<number, any> = {
    0: faSun,
    1: faSun,
    2: faCloud,
    3: faCloud,
    45: faSmog,
    48: faSmog,
    51: faCloudRain,
    53: faCloudRain,
    61: faCloudRain,
    71: faSnowflake,
    80: faCloudShowersHeavy,
  };
  const iconDef = codeMap[weather.weathercode] ?? faSun;

  return (
    <div
      id="weather"
      className="flex items-start space-x-2 p-3 bg-white/10 backdrop-blur-md rounded-lg shadow-md
      "
    >
      <FontAwesomeIcon icon={iconDef} className="text-2xl text-white self-start" />
      <div className="text-left">
        <div className="text-xl font-medium text-white">{tempF}°F</div>
        <div className="text-sm text-white">Pittsburgh, PA</div>
      </div>
    </div>
  );
}
