import geoposition from '../models/geoposition';

class App {
  constructor() {
    this.geoposition = geoposition;
  }

  init() {
    this.getPosition();
  }
  getPosition() {
    geoposition.getPosition();
   
  }
}

const app = new App();

export default app;