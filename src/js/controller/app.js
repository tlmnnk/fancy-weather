import geoposition from '../models/geoposition';
import mapView from '../views/mapView';
import weatherModel from '../models/weatherModel';

class App {
  constructor() {
    this.geoposition = geoposition;
    this.mapView = mapView;
  }

  init() {
    this.renderMapOnStart();
    this.forecastOnStart();
  }

  async forecastOnStart() {
    const currentForecast = await weatherModel.getCurrentForecast('moscow');
    const forecast16days = await weatherModel.get16DayForecast('moscow');
    console.log(currentForecast);
    console.log(forecast16days);
  }

  async renderMapOnStart() {
    const coords = await this.geoposition.fetchCoordinates();
    const { lattitude, longitude } = coords;
    this.getLocalForecast(lattitude, longitude);
    this.mapView.renderMap(lattitude, longitude);
  }
  
  async getLocalForecast(lattitude, longitude) {
    // get data (model)
    // display data with views
  }
}

const app = new App();

export default app;