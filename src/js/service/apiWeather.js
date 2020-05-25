import apiConfig from '../config/apiConfig';
import axios from 'axios';

class ApiWeather {
  constructor({ weather } = config) {
    this.apiUrl = weather.url;
    this.apiKey = weather.apiKey;
  }

  async getCurrentForecast(cityName, latitude = '', longitude = '') {
    try {
      const response = await axios.get(`${this.apiUrl}current`, {
        params: {
          key: this.apiKey,
          city: cityName,
          lat: latitude,
          lon: longitude,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;

    }
  }
  async get16DayForecast(cityName, latitude = '', longitude = '') {
    try {
      const response = await axios.get(`${this.apiUrl}forecast/daily`, {
        params: {
          key: this.apiKey,
          city: cityName,
          lat: latitude,
          lon: longitude,
        },
      });

      return response.data;
    } catch (error) {
      return false;
    }
  }
}

const apiWeather = new ApiWeather(apiConfig);

export default apiWeather;