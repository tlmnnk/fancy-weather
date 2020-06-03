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
    const resultLang = currentLang.toLowerCase();
    if (this.languages[resultLang] === null) {
      const geodata = await this.geocoding.getGeodata(lattitude, longitude, resultLang);
      if (!geodata.results.length) {
        return false;
      }
      console.log(`geodata from model`);
      console.log(geodata);

      const { lat, lng } = geodata.results[0].geometry;
      const { country, city, hamlet, village, state, county, town} = geodata.results[0].components;
      const { offset_string } = geodata.results[0].annotations.timezone;

      this.languages[resultLang] = {
        country: country,
        city: city,
        county: county,
        hamlet: hamlet,
        state: state,
        lat: lat,
        lng: lng,
        town: town,
        village: village,
        timeOffset: +offset_string.replace(/[0]/g, ''),
      };
    }
    return this.languages[resultLang];
  }

  async getGeodatabyCityName( cityName, currentLang = 'en') {
    const resultLang = currentLang.toLowerCase();
    if (this.languages[resultLang] === null)  {
      const geodata = await this.geocoding.getGeodatabyCityName(cityName, resultLang);

      if (!geodata.results.length) {
        return false;
      }
      console.log(`geodata = `);
      console.log(geodata);
      
      const { lat, lng } = geodata.results[0].geometry;
      const { country, city, hamlet, village, state, county, town } = geodata.results[0].components;

      if (!city && !hamlet && !village && !state && !county) {
        return false;
      }
      const { offset_string } = geodata.results[0].annotations.timezone;



        this.languages[resultLang] = {
          country: country,
          city: city,
          county: county,
          hamlet: hamlet,
          state: state,
          lat: lat,
          lng: lng,
          town: town,
          village: village,
          timeOffset: +offset_string.replace(/[0]/g, ''),
        };
    }
    
    return this.languages[resultLang];
  }

}

export default GeocodeModel;