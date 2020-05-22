import geoposition from '../models/geoposition';
import mapView from '../views/mapView';

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
    this.mapView.renderMap(lattitude, longitude);
   
  }
}

const app = new App();

export default app;