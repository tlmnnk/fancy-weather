import config from '../config/apiConfig';
import axios from 'axios';

class PhotosService {
  constructor({ photos } = config) {
    this.apiUrl = photos.url;
    this.apiKey = photos.apiKey;
  }

  async getPhoto( query ) {
    try {
      const response = await axios.get(`${this.apiUrl}`, {
        params: {
          client_id: this.apiKey,
          query: query,
          orientation: 'landscape'
        },
      });
      if (response.status !== 200) {
        return false;
      }
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;

    }
  }
}

const photosService = new PhotosService(config);

export default photosService;