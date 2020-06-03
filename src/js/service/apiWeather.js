import apiConfig from '../config/apiConfig';
import axios from 'axios';

class ApiWeather {
  constructor({ weather } = config) {
    this.apiUrl = weather.url;
    this.apiKey = weather.apiKey;
  }

  async getCurrentForecast(cityName, lang = 'en', latitude = '', longitude = '') {
    try {
      const response = await axios.get(`${this.apiUrl}current`, {
        params: {
          key: this.apiKey,
          city: cityName,
          lang: lang,
          lat: latitude,
          lon: longitude,
        },
      });

      if (response.status !== 200) {
        return false;
      }
      // current forecast always have only 1 item in data array
      console.log('weather = ');
      console.log(response);
      return response.data.data[0];
    } catch (error) {
      console.log(error);
      return false;

    }
  }
  async get16DayForecast(cityName, lang = 'en',latitude = '', longitude = '') {
    try {
      const response = await axios.get(`${this.apiUrl}forecast/daily`, {
        params: {
          key: this.apiKey,
          city: cityName,
          lang: lang,
          lat: latitude,
          lon: longitude,
        },
      });
      if (response.status !== 200) {
        return false;
      }
      return response.data.data;
    } catch (error) {
      return false;
    }
  }
}

const apiWeather = new ApiWeather(apiConfig);

export default apiWeather;