
class TimeDateView {
  constructor() {
    this.dayOfMonth = document.querySelector('[data-day]');
    this.year = document.querySelector('[data-year]');
    this.hour = document.querySelector('[data-hour]');
    this.minutes = document.querySelector('[data-min]');
    this.hourStr = null;
    this.monthStr = null;
  }

  getTimeZoneDay() {
    return this.dayStr;
  }

  setTimeDate(timeOffset = 0) {
    console.log('timeOffset = ....');
    console.log(timeOffset);
    
    const date = new Date(new Date().getTime() + (new Date().getTimezoneOffset()*60000) + timeOffset*1000);
    let hour = date.getHours();
    let day = date.getDate();
    let month = date.getMonth();
    let weekDay = date.getDay();

    this.weekDayStr = weekDay;
    this.hourStr = hour;
    this.monthStr = month;
    this.dayStr = day;
    this.dayOfMonth.innerText = day;
  }

  renderTime() {
    let hour = this.hourStr;
    this.year.innerText = new Date().getUTCFullYear();
    hour < 10 ? hour = '0'+hour.toString() : null;
    this.hour.innerText = hour;
    let mins = new Date().getMinutes();
    mins < 10 ? mins = '0'+mins.toString() : null;
    this.minutes.innerText = mins;
  }

  getTimezoneDay() {
    return this.dayStr;
  }
  getTimezoneMonth() {
    return this.monthStr;
  }
  getTimezoneHour() {
    return this.hourStr;
  }
  getTimezoneWeekday() {
    return this.weekDayStr;
  }

  getSearchPhotoQuery() {
    let timeOfDay, season;
    switch (true) {
      case (this.hourStr >= 0 && this.hourStr < 6):
        timeOfDay = 'night';
        break;
       case (this.hourStr >= 6 && this.hourStr < 12 ):
        timeOfDay = 'morning';
        break;
        case (this.hourStr >= 12 && this.hourStr < 18 ):
        timeOfDay = 'afternoon';
        break;
        case (this.hourStr >= 18 && this.hourStr < 24 ):
        timeOfDay = 'afternoon';
        break;
      default:
        timeOfDay = 'town';
        break;
    }
  
    switch (true) {
      case ( this.monthStr === 11 || this.monthStr >= 0 && this.monthStr < 2):
        season = 'winter';
        break;
      case (this.monthStr >= 2 && this.monthStr < 5 ):
        season = 'spring';
        break;
        case (this.monthStr >= 5 && this.monthStr < 8 ):
          season = 'summer';
        break;
        case (this.monthStr >= 8 && this.monthStr < 11 ):
          season = 'autumn';
        break;
      default:
        season = 'season';
        break;
    }

    return `${timeOfDay || ''},city,${season || 'summer'}`;
  }
}

const timeDateView = new TimeDateView();

export default timeDateView;