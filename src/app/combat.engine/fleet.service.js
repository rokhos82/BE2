////////////////////////////////////////////////////////////////////////////////
// Project: BE2
// Filename: fleet.service.js
// Description: The module to handle fleet services
// Author: Justin Lane
// Copyright: Copyright (C) 2018
////////////////////////////////////////////////////////////////////////////////
(function() {
  'use strict';

  // Fleet Class ///////////////////////////////////////////////////////////////
  class Fleet {
    constructor(name) {
      this.name = name;
      this.units = {};
    }

    get units() {
      return this.units;
    }

    get targets() {
      return this.targetList();
    }

    targetList() {
      let list = [];
      for(var unit in this.units) {
        if (this.units.hasOwnProperty(unit)) {
          list.push(unit.id);
        }
      }
    }

    addUnit(unit) {
      let id = unit.id;
      this.units[id] = unit;
    }

    addUnits(units) {}
  }

  // Setup the component and the module it belongs to ////////////////////////
  angular
    .module('combatEngine.core')
    .factory('fleet.service', turnService);

  // Inject any dependencies that this service needs /////////////////////////
  turnService.$inject = ['$log','unit.service'];

  // The factory function that defines this service //////////////////////////
  function turnService($log,unitService) {
    var service = {
    };

    return service;
  }
})();
