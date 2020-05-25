import geoposition from '../models/geoposition';
import mapView from '../views/mapView';
import apiWeather from '../service/apiWeather';

class App {
  constructor() {
    this.geoposition = geoposition;
    this.mapView = mapView;
  }

  init() {
    this.renderMap();
  }

  async renderMap() {
    const coords = await this.geoposition.fetchCoordinates();
    const { lattitude, longitude } = coords;
    const currentForecast = await apiWeather.getCurrentForecast('rgasfasdf');
    //console.log(currentForecast.data[0]);
    this.mapView.renderMap(lattitude, longitude);
   
  }
}

const app = new App();

export default app;