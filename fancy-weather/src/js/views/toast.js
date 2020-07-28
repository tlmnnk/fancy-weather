import Toast from 'universal-toast';

class MyToast{
  constructor (currentLang) {
    this.currentLang = currentLang;
    this.language = {
      invalidInput: {
        en: 'Please, enter a valid query',
        ru: 'Пожалуйста, введите корректный запрос',
        be:'Калі ласка, увядзіце карэктны запыт',
      },
      noResults: {
        en: 'Сity is not found',
        ru: 'Город не найден',
        be:'Горад не знойдзены',
      },
      NoForecast: {
        en: 'Forecst not found',
        ru: 'Прогноз не найден',
        be:'Прагноз не знойдзены',
      }
    };
  }

  wrongInputMessage() {
    Toast.show(this.language.invalidInput[this.currentLang]);
  }

  cityNotFound() {
    Toast.show(this.language.noResults[this.currentLang]);
  }

  forecastNotFound() {
    Toast.show(this.language.NoForecast[this.currentLang]);
  }

}

export default MyToast;