import config from '../config/apiConfig';

class Map {
  constructor({ map } = config) {
    this.mapContainer = document.querySelector('.main__map');
    this.key = map.apiKey;
    this.url = map.url;
  }

  renderMap(lattitude, longitude) {
    console.log({lattitude, longitude })
    const fragment = `<iframe
    class="main__map-iframe"
    frameborder="0" style="border:0"
    src="${this.url}key=${this.key}&center=${lattitude},${longitude}&zoom=11">
  </iframe>`;
  this.mapContainer.insertAdjacentHTML('afterbegin', fragment);
  }
}

const mapView = new Map();

export default mapView;