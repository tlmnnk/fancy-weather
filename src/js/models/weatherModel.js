import apiWeather from '../service/apiWeather';

class WeatherModel {
  constructor() {
    this.currentForecast = null;
    this.forecast16days = null;
  }

  async getCurrentForecast(cityName, lang, latitude = '', longitude = '') {
    const currentForecast = await apiWeather.getCurrentForecast(cityName, latitude, longitude);
    if (currentForecast === false) {
      return false;
    }
    this.currentForecast = currentForecast;
    return currentForecast;
  }

  async get16DayForecast(cityName, lang, latitude = '', longitude = '') {
    const forecast16days = await apiWeather.get16DayForecast(cityName, latitude, longitude);
    if (forecast16days === false) {
      return false;
    }
    // getting 3 days out of 16
    return forecast16days.splice(0, 3);
  }
}

const weatherModel = new WeatherModel();

export default weatherModel;