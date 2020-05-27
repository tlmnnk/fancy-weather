import { languages } from '../config/constants';
import geoposition from '../models/geoposition';
import mapView from '../views/mapView';
import weatherModel from '../models/weatherModel';
import weatherView from '../views/weatherView';
import GeocodeModel from '../models/geocodeModel';
import cityView from '../views/cityView';
import langSwitch from '../views/langSwitch';


class App {
  constructor() {
    this.geoposition = geoposition;
    this.mapView = mapView;
    this.weatherModel = weatherModel;
    this.weatherView = weatherView;
    this.currentCoords = null;
    this.currentWeatherCode = null;
    this.currentLang = languages.english;
    this.cityView = cityView;
    this.geocodeModel = new GeocodeModel();
    this.langSwitch = langSwitch;
  }

  async init() {
    await this.renderMapOnStart();
    await this.renderForecastOnStart();
    this.renderCityLocation( this.currentCoords, this.currentLang );
    this.langSwitch.initEventListener(this.currentWeatherCode);
  }

  async renderForecastOnStart() {
    await this.getLocalForecast(this.currentCoords);
  }

  async renderMapOnStart() {
    const coords = await this.geoposition.fetchCoordinates();
    this.currentCoords = { ...coords };

    const { lattitude, longitude } = coords;
    this.mapView.renderMap(lattitude, longitude);
  }

  async renderCityLocation( { lattitude, longitude }, lang ) {
    const geodata = await this.geocodeModel.getCityGeodata( lattitude, longitude, lang);
    this.cityView.renderCity(geodata);
  }
  
  async getLocalForecast({ lattitude, longitude }) {
    const [ currentForecast, forecast3days ] = await Promise.all(
      [this.weatherModel.getCurrentForecast( '', '', lattitude, longitude ),
      this.weatherModel.get3DayForecast( '', '', lattitude, longitude )]
    );
    const { code } = currentForecast.weather;
    this.currentWeatherCode = code;

    this.weatherView.renderCurrentForecast(currentForecast);
    this.weatherView.render3daysForecast(forecast3days);
  }
}

const app = new App();

export default app;