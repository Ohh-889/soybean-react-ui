class Config {
  private _githubUrl = 'https://github.com/Ohh-889/soybean-react-ui';

  get githubUrl() {
    return this._githubUrl;
  }
}

const config = new Config();

export default config;
