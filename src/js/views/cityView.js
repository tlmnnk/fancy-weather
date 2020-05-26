class CityView {
  constructor() {
    this.cityContainer = document.querySelector('[data-city]');
  }
  renderCity( { city, country } ) {
    this.cityContainer.innerText = `${city}, ${country}`;
  }
}

const cityView = new CityView();

export default cityView;