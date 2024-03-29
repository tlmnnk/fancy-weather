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
        lattitude: 40.7142715,
        longitude: -74.0059662
      };
      return this.coords;
    }
  } 
}

const geoposition = new Geoposition();
export default geoposition;