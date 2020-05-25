import { iconLink } from '../config/constants';

class WeatherView {
  constructor() {
    this.container = document.querySelector('.forecast');
    this.forecastTemp = document.querySelector('.forecast__temp');
    this.forecastImg = document.querySelector('.forecast__img');
    this.forecastWeather = document.querySelector('.forecast__weather');
    this.forecastAppTemp = document.querySelector('.forecast__app');
    this.forecastWind = document.querySelector('.forecast__wind');
    this.forecastHumidity = document.querySelector('.forecast__humidity');
    this.forecastWeekdays = document.querySelectorAll('.forecast__3days--weekday');
    this.forecastWeekdaysWeather = document.querySelectorAll('.forecast__3days--weather span');
    this.forecastWeekdaysImg = document.querySelectorAll('.forecast__3days--weather img');
  }

  renderCurrentForecast(currentForecast) {
    let { app_temp, temp, rh, weather, wind_spd } = currentForecast;
    const { icon, description } = weather;
    const appTemp = this.serializeForecast(app_temp);
    const temperature = this.serializeForecast(temp);

    this.forecastTemp.innerText = temperature;
    this.forecastImg.setAttribute(
      'src',
      `${iconLink}${icon}.png`
      );
    this.forecastWeather.innerText = description;
    this.forecastAppTemp.innerText = appTemp;
    this.forecastWind.innerText = wind_spd;
    this.forecastHumidity.innerText = rh;
    
  }

  serializeForecast(data) {
    let dataStr = data.toString();
    dataStr.includes('.') ? dataStr = dataStr.slice(0, dataStr.indexOf('.')) : null;
    dataStr.includes('-') ? dataStr = `${dataStr}°` : dataStr = `+${dataStr}°`;
    return dataStr;
  }
}

const weatherView = new WeatherView();

export default weatherView;