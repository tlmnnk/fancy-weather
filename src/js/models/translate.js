import apiTranslate from '../service/apiServiceYaTranslate';

class Translate {
  constructor(api) {
    this.api = api;
  }

  async translateWord(word) {
    const translated = await this.api.translateWord(word);
    return translated.text[0];
  }
}

const translate = new Translate(apiTranslate);

export default translate;
