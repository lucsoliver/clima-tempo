export type WeatherApiResponse = {
  cod: number | string;
  weather?: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main?: {
    temp: number;
    humidity: number;
  };
  wind?: {
    speed: number;
  };
  rain?: {
    "1h"?: number;
  };
};

export type WeatherData = {
  temp: string;
  rain: string;
  humidity: string;
  wind: string;
  description: string;
  icon: string;
  background: string;
};
