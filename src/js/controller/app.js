/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
import '../plugins';
import clearInputBtn from '../views/clearInputBtn';
import info from '../views/info';
import formUI from '../views/form';
import movieUI from '../views/moviesView';
import moviesStore from '../store/movieStore';
import translate from '../store/translate';
import mySwiper from '../plugins/swiper';
import keyboard from '../views/keyboard';


export default class App {
  constructor() {
    this.forUI = formUI;
    this.movieUI = movieUI;
    this.moviesStore = moviesStore;
    this.currentSearch = 'movie';
    this.currentPage = 1;
    this.totalSearchResults = null;
    this.isSearchRussian = false;
  }

  init() {
    this.startUpPageInit();
    this.formSubmitInit();
    this.initEventListeners();
    keyboard.init();
  }

  async startUpPageInit() {
    this.preRenderSliderHandler();
    const currentSearchReponse = await moviesStore.searchMovies(this.currentSearch);


    if (!currentSearchReponse) {
      info.setInfoText('Something went wrong...');
      return;
    }
    if (currentSearchReponse.Response && !JSON.parse(currentSearchReponse.Response.toLowerCase())) {
      info.setInfoText(currentSearchReponse.Error);
      return;
    }
    this.totalSearchResults = moviesStore.getTotalResults();
    info.deleteLoader();
    this.movieUI.renderSliderMovieItems(currentSearchReponse);
    this.imgSmoothLoadHandler();
    mySwiper.update();
  }

  initEventListeners() {
    document.addEventListener('click', (e) => {
      clearInputBtn.clearInputTextHandler(e, this.forUI.input);
      this.keyBoardIconHandler(e);
      this.keyboardEnterClick(e);
    });

    mySwiper.on('slideChange', () => {
      if (mySwiper.activeIndex >= ((this.currentPage * 10) - 8)) {
        this.loadNextTenMovies();
      }
    });
  }

  keyboardEnterClick(e) {
    if (e.target.getAttribute('data') === 'Enter') {
      this.onFormSubmit();
    }
  }

  formSubmitInit() {
    const form = this.forUI.form;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onFormSubmit();
    });
  }

  keyBoardIconHandler(e) {
    if (e.target.classList.contains('form__keyboard')) {
      e.target.classList.toggle('form__keyboard--light');
      keyboard.toggleKeyboard();
      this.forUI.input.focus();
    }
  }

  imgSmoothLoadHandler() {
    document.querySelectorAll('img:not(.load)').forEach((item) => {
      ['load', 'error'].forEach((event) => {
        item.addEventListener(event, (e) => {
          if (!e.target.classList.contains('load')) {
            e.target.parentNode.classList.add('visible');
            e.target.classList.add('load');
          }
        });
      });
    });
  }

  preRenderSliderHandler() {
    this.currentPage !== 1 ? this.currentPage = 1 : null;
    info.renderLoader();
    this.movieUI.clearSliderContainer();
    mySwiper.slideTo(0);
    mySwiper.update();
  }

  async loadNextTenMovies() {
    if ([0, 1].includes(mySwiper.activeIndex)) {
      return;
    }
    if (this.currentPage > Math.floor(this.totalSearchResults / 10)) {
      info.setInfoText(`No more results for "${this.currentSearch}"`);
      return;
    }

    this.currentPage += 1;
    info.renderLoader();
    // eslint-disable-next-line max-len
    const currentSearchReponse = await moviesStore.searchMovies(this.currentSearch, this.currentPage);

    this.movieUI.renderSliderMovieItems(currentSearchReponse);
    this.imgSmoothLoadHandler();
    mySwiper.update();
    info.deleteLoader();
    if (/[а-яА-Я]/g.test(formUI.inputValue) && this.isSearchRussian) info.setInfoText(`Showing result for "${formUI.inputValue}"`);
  }

  // eslint-disable-next-line consistent-return
  async isRusInput(input) {
    if (/[а-яА-Я]/g.test(input)) {
      this.isSearchRussian = true;
      return translate.translateWord(input);
    }
  }

  async onFormSubmit() {
    let userInputValue = formUI.inputValue.trim();
    document.querySelector('.form__keyboard--light') ? document.querySelector('.form__keyboard--light').classList.remove('form__keyboard--light') :  null;
    document.querySelector('.keyboard').classList.contains('keyboard--visible') ? document.querySelector('.keyboard').classList.remove('keyboard--visible') : null;
    if (/^.{0,1}$/.test(userInputValue)) {
      info.setInfoText('Please, type in at least 2 characters');
      return;
    }
    const translated = await this.isRusInput(userInputValue);

    translated ? userInputValue = translated : this.isSearchRussian = false;

    userInputValue !== '' ? this.currentSearch = userInputValue : null;
    this.preRenderSliderHandler();

    const currentSearchReponse = await moviesStore.searchMovies(userInputValue);
    this.totalSearchResults = moviesStore.getTotalResults();

    info.deleteLoader();
    translated ? info.setInfoText(`Showing results for "${formUI.inputValue}"`) : null;

    if (!currentSearchReponse) {
      info.setInfoText(`Sorry, no results for "${this.currentSearch}"`);
      mySwiper.removeAllSlides();
      return;
    }
    if (currentSearchReponse.Response && !JSON.parse(currentSearchReponse.Response.toLowerCase())) {
      info.setInfoText(currentSearchReponse.Error);
      return;
    }


    this.movieUI.renderSliderMovieItems(currentSearchReponse);
    this.imgSmoothLoadHandler();
    mySwiper.update();
  }
}
