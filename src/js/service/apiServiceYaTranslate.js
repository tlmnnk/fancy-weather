/* eslint-disable no-shadow */
import axios from 'axios';
import config from '../config/apiConfig';

/**
 * /countries - array of countries
 * /cities - array of cities
 * /prices/cheap - array
 */
class ApiTranslate {
  constructor(config) {
    this.url = config.yandex.url;
    this.apiKey = config.yandex.apiKey;
  }

  async translateWord(word) {
    try {
      const response = await axios.get(`${this.url}`, {
        params: {
          key: this.apiKey,
          text: word,
          lang: 'ru-en',
        },
      });
      return response.data;
    } catch (err) {
      return false;
    }
  }
}

const apiTranslate = new ApiTranslate(config);

export default apiTranslate;
