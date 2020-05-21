class Geoposition {
  constructor() {
    this.coords = {
      latitude: null,
      longitude: null
    };
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  }

  success(pos) {
    const { latitude, longitude}  = pos.coords;
      // console.log(`Широта: ${crd.latitude}`);
      // console.log(`Долгота: ${crd.longitude}`);
      // console.log(`Плюс-минус ${crd.accuracy} метров.`);
   this.coords =  {
      latitude: latitude,
      longitude: longitude
    };
    return this.coords;
  } 
    
  error() {
    this.coords = {
      lattitude: 40.7128,
      longitude: 74.0060
      };

      return this.coords;
    }
    
  getPosition() {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, this.options));
    }

  async fetchCoordinates() {
    try {
      const { coords } = await this.getPosition();
      const { latitude, longitude } = coords;
      this.coords = {
        lattitude: latitude,
        longitude: longitude
        };
        return this.coords;
      
  } catch (error) {
      // Default coordinates New York
      this.coords = {
        lattitude: 40.7128,
        longitude: 74.0060
      };
      return this.coords;
    }
  } 
}

const geoposition = new Geoposition();
export default geoposition;