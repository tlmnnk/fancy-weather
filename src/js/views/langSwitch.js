import { languages } from "../config/constants";
import ru from '../i18n/ru';
import en from '../i18n/en';
import be from '../i18n/be';
import timedateView from '../views/timeDateView';

class LangSwitch {
  constructor () {
    this.timedateView = timedateView;
    this.langSwitch = document.querySelector('.switch-toggle');
    this.elementsToTranslate = document.querySelectorAll('[data-i18n]');
    this.languages = {
       RU: { ...ru },
       EN: { ...en },
       BE: { ...be },
    };
  }
  
  applyLanguage(language, weatherCode) {
    Object.keys(language).forEach((key) => {
      const elementToTranslate = [...this.elementsToTranslate].filter(element => element.getAttribute('data-i18n') === key);

      if (key === 'city') {
        elementToTranslate.forEach(item => item.setAttribute('placeholder', `${language.city}...`)); 
      }

      if (key === 'month') {
        const currentMonth = this.timedateView.getTimezoneMonth() || new Date().getMonth();
        elementToTranslate.forEach(item => item.innerText = language.month[currentMonth]); 
      }
      if (key === 'weekday') {
        // get proper day from timedateView
        console.log('timezone weekday = ');
        console.log(this.timedateView.getTimezoneWeekday());
        
        let weekdayIndex = this.timedateView.getTimezoneWeekday() || new Date().getDay();
        elementToTranslate.forEach((item) => {
          item.innerText = language.weekday[weekdayIndex];
          weekdayIndex += 1;
          weekdayIndex === 7 ? weekdayIndex = 0 : null;
        });
      } 
      if (key === 'weather') {
        const translation = language.weather[weatherCode];
        elementToTranslate.forEach(item => item.innerText = translation); 
      }
      if (!(language[key] instanceof Array) && !(language[key] instanceof Object)) {
        elementToTranslate.forEach(item => item.innerText = language[key]); 
      }
      
      
    });
  }

  removeAllChecked() {
    const buttons = document.querySelectorAll('.switch-toggle label');
    buttons.forEach((item) => {
      item.classList.remove('radio-checked');
    });
  }
}

const langSwitch = new LangSwitch();

export default langSwitch;