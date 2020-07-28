class TempUnits {
  constructor() {
    this.degreesContainer = document.querySelectorAll('[data-deg]');
    this.buttonContainer = document.querySelector('.header__degrees');
    this.tempCelArray = [];
    this.curDeg= null;
    this.forecastArrayInCel = [];
  }

  eventHandler(e) {
    if (e.target.getAttribute('id') === 'far' || 'cel') {
      if (e.target.classList.contains('radio-checked')) {
        return;
      }
      if (e.target.hasAttribute('data-tempswitch')) {
        this.switchCheckedButton(e);
        if (e.target.getAttribute('data-tempswitch') === 'far') {
          
          this.renderFarTempUnit();
        }
        if (e.target.getAttribute('data-tempswitch') === 'cel') {
          this.renderCelTempUnit();
        }
        this.curDeg = e.target.getAttribute('data-tempswitch');
       
      }
    }
    
  }

  serializeForecast(data) {
    let dataStr = data.toString();
    dataStr.includes('.') ? dataStr = dataStr.slice(0, dataStr.indexOf('.')) : null;
    dataStr.includes('-') ? dataStr = `${dataStr}°` : dataStr = `+${dataStr}°`;
    return dataStr;
  }

  getCurrentUnitTemperat() {
    return this.curDeg;
  }

  renderFarTempUnit() {
    [...this.degreesContainer].forEach((item, i) =>  {
      let temp = (this.forecastArrayInCel[i] * 1.8) + 32;
      temp = this.serializeForecast(temp);
      item.innerText = temp; 
      });
    }

    storeForecast(currentForecast, forecast3days) {
      let { app_temp, temp } = currentForecast;
      this.forecastArrayInCel.push(temp);
      this.forecastArrayInCel.push(app_temp);
      forecast3days.forEach((forecastForDay, i) => {
        const { temp } = forecastForDay;
        this.forecastArrayInCel.push(temp);
      });
    }

  renderCelTempUnit() {
    [...this.degreesContainer].forEach((item, i) => {
      let temp = this.forecastArrayInCel[i];
      temp = this.serializeForecast(temp);
      item.innerText = temp;
    });
  }

  switchCheckedButton(e) {
    const buttons = document.querySelectorAll('[data-tempswitch]');
    buttons.forEach((item) => {
      item.classList.remove('radio-checked');
    });
    e.target.classList.add('radio-checked');
  }
}

export default TempUnits;