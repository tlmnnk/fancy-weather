import geocoding from '../service/geocoding';

class GeocodeModel {
  constructor() {
    this.languages = {
      en: null,
      ru: null,
      be: null,
    };
    this.geocoding = geocoding;
  }

  async getCityGeodata(lattitude, longitude, currentLang = 'en') {
    if (this.languages[currentLang] === null) {
      const geodata = await this.geocoding.getGeodata(lattitude, longitude, currentLang);
      const { country, city } = geodata.results[0].components;
      this.languages[currentLang] = {
        country: country,
        city: city,
      };
    }
    return this.languages[currentLang];
  }
}

export default GeocodeModel;