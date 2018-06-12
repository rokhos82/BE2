////////////////////////////////////////////////////////////////////////////////
// Defaults - this file holds all of the default objects for use in BE2.
////////////////////////////////////////////////////////////////////////////////

// Defaults Base Class /////////////////////////////////////////////////////////
/**
* Represents the most basic defaults object.  May never be used but in place
* in the event it is needed.
**/
class defaults {};

// User Data Defaults //////////////////////////////////////////////////////////
/**
* Represents the defaults for the user-data file.  These include window size,
* maximized state, and other options
**/
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

// Export the public classes ///////////////////////////////////////////////////
module.exports = {userDefaults};
