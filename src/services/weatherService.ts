import type { WeatherApiResponse, WeatherData } from "../types/weather";
import { getWeatherImage } from "../utils/weatherImage";

export const fetchWeatherByCity = async (
  city: string,
  apiKey: string,
): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&lang=pt_br&units=metric`,
  );

  const data = (await response.json()) as WeatherApiResponse;

  if (data.cod !== 200 || !data.weather || !data.main || !data.wind) {
    throw new Error("Cidade não encontrada.");
  }

  const weatherType = data.weather[0].main.toLowerCase();
  const rain = data.rain ? (data.rain["1h"] ?? 0) : 0;
  const rainPercentage = rain > 0 ? Math.min(rain * 10, 100) : 0;
  const formattedRain = Number(rainPercentage.toFixed(1));

  return {
    temp: `${Math.round(data.main.temp)} °C`,
    rain: `${formattedRain}%`,
    humidity: `${data.main.humidity}%`,
    wind: `${Math.round(data.wind.speed)} km/h`,
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    background: getWeatherImage(weatherType),
  };
};
