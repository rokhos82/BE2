////////////////////////////////////////////////////////////////////////////////
// Project: BE2
// Filename: fleet.service.js
// Description: The module to handle fleet services
// Author: Justin Lane
// Copyright: Copyright (C) 2018
////////////////////////////////////////////////////////////////////////////////
(function() {
  'use strict';

  // Setup the component and the module it belongs to ////////////////////////
  angular
    .module('combatEngine.core')
    .factory('fleet.service', fleetService);

  // Inject any dependencies that this service needs /////////////////////////
  fleetService.$inject = ['$log','unit.service'];

  // The factory function that defines this service //////////////////////////
  function fleetService($log,unitService) {
    var service = {
      arrayToDictionary: arrayToDictionary,
      isAlive: isAlive,
      targetList: targetList
    };

    return service;

    /**
    * Build a dictionary of fleets from an array of fleets.  Allows gener-
    * tion of UUIDs if desired.
    */
    function arrayToDictionary(fleetArray,generateUUID) {
      let dict = {};
      fleetArray.forEach(function(fleet){
        if(generateUUID && !fleet.uuid) {
          let uuid = Math.random();
          fleet.uuid = uuid.toString();
          this[fleet.uuid] = fleet;
        }
        else if(!!fleet.uuid) {
          this[fleet.uuid] = fleet;
        }
        else {
          this[fleet.name] = fleet;
        }
      },dict);
      return dict;
    }

    /**
    * Are there any units left in the fleet
    */
    function isAlive(fleet) {
      let alive = false;
      fleet.units.forEach(function(unit){
        if(unitService.isAlive(unit)){
          alive = true;
        }
      });
      return alive;
    }

    /**
    * Get the target list for the fleet
    */
    function targetList(fleet) {
      let targets = [];
      fleet.units.forEach(function(unit){
        this.push(unitService.getID(unit));
      },targets);
      return targets;
    }
  }
})();
