class Preloader {
  constructor() {
    this.preloader = document.querySelector('.preloader');
  }

  show () {
    this.preloader.classList.add('visible');
  }

  hide() {
    this.preloader.classList.remove('visible');
  }
}

const preloader = new Preloader();

export default preloader;