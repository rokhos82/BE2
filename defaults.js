class defaults {};

// User Data Defaults //////////////////////////////////////////////////////////
class userDefaults extends defaults {
  constructor() {
    super();
    this.windowProperties = {
      width: 1280,
      height: 800,
      maximized: false
    };
  }

  static getProperties() {
    return this.windowProperties;
  }
};

module.exports = {userDefaults};
