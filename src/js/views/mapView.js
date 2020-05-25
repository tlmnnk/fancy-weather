import config from '../config/apiConfig';

class Map {
  constructor( { map } = config ) {
    this.mapContainer = document.querySelector('.map');
    this.mapFrame = null;
    this.key = map.apiKey;
    this.url = map.url;
  }

  renderMap(lattitude, longitude) {
    const fragment = `<iframe
      class="map__iframe"
      frameborder="0" style="border:0"
      src="${this.url}key=${this.key}&center=${lattitude},${longitude}&zoom=11">
    </iframe>
    <div class="map__info">
           <div class="map__info--lat">Широта <span></span></div>
           <div class="map__info--lon"> Долгота <span></span></div>
         </div>`;
     this.mapContainer.insertAdjacentHTML('afterbegin', fragment);
     this.mapFrame = document.querySelector('.main__map-iframe');
     this.updateCoordsInfo(lattitude, longitude);
  }

  centerMapByCoordinates(lattitude, longitude) {
    this.mapFrame.setAttribute(
      'src',
      `${this.url}key=${this.key}&center=${lattitude},${longitude}&zoom=11`
    );
    this.updateCoordsInfo(lattitude, longitude);
  }

  updateCoordsInfo(lattitude, longitude) {
    const lat = lattitude.toString().length > 8 ? lattitude.toString().slice(0,8) : lattitude;
    const lon = longitude.toString().length > 8 ? longitude.toString().slice(0,8) : longitude;
    document.querySelector('.map__info--lat').firstElementChild.innerText = lat;
    document.querySelector('.map__info--lon').firstElementChild.innerText = lon;
  }
}

const mapView = new Map();

export default mapView;