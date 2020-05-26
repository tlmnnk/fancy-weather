import axios from 'axios';
import config from '../config/apiConfig';

class Geocoding {
  constructor( { geocoding } = config ) {
    this.apiUrl = geocoding.url;
    this.apiKey = geocoding.apiKey;
    console.log(geocoding);
  }

  async getGeodata( latitude, longitude, language = 'en') {
    try {
      const response = await axios.get(`${this.apiUrl}`, {
        params: {
          key: this.apiKey,
          q: `${latitude},${longitude}`,
          language : language,
        },
      });
      console.log(response);
      if (response.status !== 200) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return false;

    }
  }
}

const geocoding = new Geocoding();

export default geocoding;