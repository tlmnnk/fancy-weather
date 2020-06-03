class CityView {
  constructor() {
    this.cityContainer = document.querySelector('[data-city]');
  }
  renderCity( { city, hamlet, country, village, town, county, state } ) {
    this.cityContainer.innerText = `${hamlet ? hamlet : city ? city : village || town || county || state}, ${country}`;
  }
}

const cityView = new CityView();

export default cityView;