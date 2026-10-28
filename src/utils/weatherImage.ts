export const getWeatherImage = (weather: string): string => {
  switch (weather) {
    case "clear":
      return "/images/clear.jpg";
    case "clouds":
      return "/images/clouds.jpg";
    case "rain":
    case "drizzle":
      return "/images/rain.jpg";
    case "thunderstorm":
      return "/images/thunder.jpg";
    case "snow":
      return "/images/snow.jpg";
    default:
      return "/images/clear.jpg";
  }
};
