
class TimeDateView {
  constructor() {
    this.dayOfMonth = document.querySelector('[data-day]');
    this.year = document.querySelector('[data-year]');
    this.hour = document.querySelector('[data-hour]');
    this.minutes = document.querySelector('[data-min]');
  }

  setTimeDate(timeOffset = 0) {
    let hour = new Date().getUTCHours() + timeOffset;
    let day = new Date().getDate();
    if (hour <= 0) {
      hour === 0 ? hour = '00' : null;
      hour = 24 + hour;
      day = day - 1;
      if (day === 0) {
        day = new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDate();
      }
    }
    hour <= 0 ? hour === 0 ? hour = '00' : hour = 24 - hour : null; 
    this.dayOfMonth.innerText = day;
    this.year.innerText = new Date().getUTCFullYear();
    this.hour.innerText = hour;
    this.minutes.innerText = new Date().getMinutes();
  }
}

const timeDateView = new TimeDateView();

export default timeDateView;