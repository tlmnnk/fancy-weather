import photosService from '../service/photos';
import preloader from '../views/preloader';

class PhotoView {
  constructor() {
    this.apiService = photosService;
    this.preloader = preloader;
  }

  async changePhotoHandler(e, searchStr) {
    if (e.target.classList.contains('background-change')) {
      this.preloader.show();
      this.changePhoto(searchStr);
    }
  }

  async changePhoto(searchStr) {
    const res = await this.apiService.getPhoto(searchStr);
    
    console.log(`searchPhotoStr === `);
    console.log(searchStr);
    
      const { regular } = res.urls;
      if(regular) {
        const img = new Image();
        img.onload = () => {
          document.querySelector('body').style.backgroundImage = `url(${regular})`;
          this.preloader.hide();
        };
        img.src = regular;
      } else {
        this.preloader.hide();
      }
  }
}

const photoView = new PhotoView();

export default photoView;
