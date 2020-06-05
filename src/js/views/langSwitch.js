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

  renderLangAndTempButtons(currentLang, currentDeg){
    let fragmentLang, fragmentDeg;
    switch (currentLang) {
      case 'en':
        fragmentLang = `<input id="en" name="view" type="radio" checked>
        <label class="radio-checked" for="en" data-lang onclick="">en</label>
        <input id="ru" name="view" type="radio" >
        <label for="ru" data-lang onclick="">ru</label>
        <input id="be" name="view" type="radio">
        <label for="be" data-lang onclick="">be</label>
        <a></a>`;
        break;
      case 'ru':
        fragmentLang = `<input id="en" name="view" type="radio">
        <label for="en" data-lang onclick="">en</label>
        <input id="ru" name="view" type="radio" checked>
        <label class="radio-checked" for="ru" data-lang onclick="">ru</label>
        <input id="be" name="view" type="radio">
        <label for="be" data-lang onclick="">be</label>
        <a></a>`;
        break;
      case 'be':
        fragmentLang = `<input id="en" name="view" type="radio">
        <label for="en" data-lang onclick="">en</label>
        <input id="ru" name="view" type="radio" >
        <label for="ru" data-lang onclick="">ru</label>
        <input id="be" name="view" type="radio" checked>
        <label class="radio-checked" for="be" data-lang onclick="">be</label>
        <a></a>`;
        break;
      default:
        break;
    }
    switch (currentDeg) {
      case 'cel':
        fragmentDeg = `<div class="switch-toggle switch-candy">
        <input id="cel" name="view2" type="radio" checked>
        <label class="radio-checked" for="cel" data-tempswitch='cel' onclick="">°C</label>
        <input id="far" name="view2" type="radio">
        <label for="far" data-tempswitch="far" onclick="">°F</label>
        <a></a>
      </div>`;
        break;
      case 'far':
        fragmentDeg = `<div class="switch-toggle switch-candy">
        <input id="cel" name="view2" type="radio">
        <label  for="cel" data-tempswitch='cel' onclick="">°C</label>
        <input id="far" name="view2" type="radio" checked>
        <label class="radio-checked" for="far" data-tempswitch="far" onclick="">°F</label>
        <a></a>
      </div>`;
        break;
    
      default:
        break;
    }

    const langButtonsContainer = document.querySelector('.header__lang .switch-toggle');
    const tempButtonsContainer = document.querySelector('.header__deg');
    langButtonsContainer.insertAdjacentHTML('afterbegin', fragmentLang);
    tempButtonsContainer.insertAdjacentHTML('afterbegin', fragmentDeg);
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