// types/weather.ts
export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  is_day: 0 | 1;
  time: string;
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  current_weather: CurrentWeather;
}