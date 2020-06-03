import { languages } from '../config/constants';
import geoposition from '../models/geoposition';
import mapView from '../views/mapView';
import weatherModel from '../models/weatherModel';
import weatherView from '../views/weatherView';
import GeocodeModel from '../models/geocodeModel';
import cityView from '../views/cityView';
import langSwitch from '../views/langSwitch';
import timeDateView from '../views/timeDateView';
import MyToast from '../views/toast';
import preloader from '../views/preloader';
import tempUnits from '../views/degrees';


class App {
  constructor() {
    this.geoposition = geoposition;
    this.mapView = mapView;
    this.weatherView = weatherView;
    this.weatherModel = weatherModel;
    this.cityView = cityView;
    this.timeDateView = timeDateView;
    this.preloader = preloader;
    this.currentCoords = null;
    this.currentWeatherCode = null;
    this.currentLang = languages.english;
    this.currentCity = null;
    this.tempUnits = tempUnits;
    this.geocodeModel = new GeocodeModel();
    this.langSwitch = langSwitch;
    this.currentDeg = 'cel';
  }

  async init() {
    await this.renderMapOnStart();
    await this.renderForecastOnStart();
    this.renderCityLocationAndDate( this.currentCoords, this.currentLang );
    //this.langSwitchIventListener(this.currentWeatherCode);
    this.initEventListeners();
  }

  initEventListeners() {
    document.querySelector('.form').addEventListener('submit', (e) => {
      this.onFormSubmit(e);
    });
    document.querySelector('.header__buttons').addEventListener('click', async(e) => {
      this.langSwitchIventListener(e);
      this.tempUnits.eventHandler(e);
      this.degreesSwitchHandler(e);
    });
  }

  degreesSwitchHandler(e) {
    if (e.target.getAttribute('data-tempswitch') === 'far' || 'cel') {
      this.currentDeg = e.target.getAttribute('data-tempswitch');
    }
  }
  async langSwitchIventListener(e) {
      if (e.target.classList.contains('radio-checked')) {
        return;
      }
      if (e.target.hasAttribute('data-lang')) {
        
        console.log(`currentCoords from langswitch.....`);

        const cityTranslation = await this.geocodeModel.getGeodatabyCityName(this.currentCity, e.target.innerText);
        this.cityView.renderCity(cityTranslation);
        this.langSwitch.removeAllChecked();
        this.langSwitch.applyLanguage(this.langSwitch.languages[e.target.innerText], this.currentWeatherCode);
        e.target.classList.add('radio-checked');
        
        this.currentLang = e.target.innerText.toLowerCase();
      }

   
  }

  async renderForecastOnStart() {
    const forecast = await this.getLocalForecast(this.currentCoords);
    const { currentForecast, forecast3days } = forecast;
    this.renderForcast(currentForecast, forecast3days);
  }

  async getForecastByCoords(lang, lat, lng) {
    const [ currentForecast, forecast3days ] = await Promise.all(
      [this.weatherModel.getCurrentForecast( '', lang, lat, lng ),
      this.weatherModel.get3DayForecast( '', lang, lat, lng)]
    );
   
    const { code } = currentForecast.weather;
    this.currentWeatherCode = code;
        return {
          currentForecast: currentForecast,
          forecast3days: forecast3days,
        };
  }

  async renderMapOnStart() {
    this.preloader.show();
    const coords = await this.geoposition.fetchCoordinates();
    this.currentCoords = { ...coords };

    const { lattitude, longitude } = coords;
    this.mapView.renderMap(lattitude, longitude);
  }

  async renderCityLocationAndDate( { lattitude, longitude }, lang ) {

    const geodata = await this.geocodeModel.getCityGeodata( lattitude, longitude, lang);
    const { timeOffset } = geodata;
    this.currentCity = geodata.city || geodata.hamlet || geodata.village || geodata.county;
    this.timeDateView.setTimeDate(timeOffset);
    this.langSwitch.applyLanguage(this.langSwitch.languages[lang.toUpperCase()], this.currentWeatherCode);
    this.cityView.renderCity(geodata);
    document.querySelector('.main').classList.remove('overlay');
    this.preloader.hide();
  }
  
  async getLocalForecast({ lattitude, longitude }) {
    const [ currentForecast, forecast3days ] = await Promise.all(
      [this.weatherModel.getCurrentForecast( '', '', lattitude, longitude ),
      this.weatherModel.get3DayForecast( '', '', lattitude, longitude )]
    );
    const { code } = currentForecast.weather;
    this.currentWeatherCode = code;

    return {
      currentForecast: currentForecast,
      forecast3days: forecast3days
    };

    
  }

  renderForcast(currentForecast, forecast3days) {
    this.weatherView.renderCurrentForecast(currentForecast);
    this.weatherView.render3daysForecast(forecast3days);
    this.tempUnits.getCelvalues();
    this.currentDeg = this.tempUnits.getCurrentUnitTemperat();
  }

  inputValdation(input) {
    if (/^[a-zа-я]{2,}(?:[\s-][a-zа-я]+)*$/i.test(input)) 
    return true;
  }

  async onFormSubmit(e) {
      this.preloader.show();
      e.preventDefault();
      const inputValue = document.querySelector('.search-city__input').value.trim();
      if (!this.inputValdation(inputValue)) {
        new MyToast(this.currentLang).wrongInputMessage();
        this.preloader.hide();
        return;
      }
      
      this.geocodeModel = new GeocodeModel();
      const geo = await this.geocodeModel.getGeodatabyCityName(inputValue, this.currentLang);
      if (!geo) {
        new MyToast(this.currentLang).cityNotFound();
        this.preloader.hide();
        return;
      }
      this.currentCity = inputValue;
      console.log('geo = ');      
      console.log(geo);      
      const { lat, lng, timeOffset } = geo;
      this.currentCoords = {
        latitude: lat,
        longitude: lng,
      };
      console.log(this.currentCoords); 
      const res = await this.getForecastByCoords(this.currentLang, lat, lng);
      const { currentForecast, forecast3days } = res;

      if (!currentForecast || !forecast3days) {
        new MyToast(this.currentLang).forecastNotFound();
        this.preloader.hide();
        return;
      }
      document.querySelector('.search-city__input').value = '';
      this.renderForcast(currentForecast, forecast3days);
      console.log(this.currentDeg);
      if (this.currentDeg === 'far') {
        this.tempUnits.renderFarTempUnit();
      }
      
      this.mapView.centerMapByCoordinates(lat, lng);
      this.mapView.updateCoordsInfo(lat, lng);
  
      this.cityView.renderCity(geo);
      this.langSwitch.applyLanguage(this.currentLang, this.currentWeatherCode);
      this.timeDateView.setTimeDate(timeOffset);
      this.preloader.hide();
  }
}

const app = new App();

export default app;