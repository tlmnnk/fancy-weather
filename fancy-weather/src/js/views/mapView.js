import config from '../config/apiConfig';

class Map {
  constructor( { map } = config ) {
    this.mapContainer = document.querySelector('.map');
    this.mapFrame = document.querySelector('.map__iframe');
    this.key = map.apiKey;
    this.url = map.url;
  }

  renderMap(lattitude, longitude) {
    this.mapFrame.setAttribute(
      'src',
      `${this.url}key=${this.key}&center=${lattitude},${longitude}&zoom=11`
    );
    
    this.updateCoordsInfo(lattitude, longitude);
  }

  centerMapByCoordinates(lattitude, longitude) {
    this.mapFrame.setAttribute(
      'src',
      `${this.url}key=${this.key}&center=${lattitude},${longitude}&zoom=11`
    );
  }

  updateCoordsInfo(lattitude, longitude) {
    const lat = lattitude.toString().length > 8 ? lattitude.toString().slice(0,8) : lattitude;
    const lon = longitude.toString().length > 8 ? longitude.toString().slice(0,8) : longitude;
    document.querySelector('[data-lat]').innerText = lat;
    document.querySelector('[data-lon]').innerText = lon;
  }
}

const mapView = new Map();

export default mapView;