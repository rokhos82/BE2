////////////////////////////////////////////////////////////////////////////////
// Project: BE2
// Filename: turn.service.js
// Description: The module to handle the unit services
// Author: Justin Lane
// Copyright: Copyright (C) 2018
////////////////////////////////////////////////////////////////////////////////
(function() {
  'use strict';

  // Setup the component and the module it belongs to ////////////////////////
  angular
    .module('combatEngine.core')
    .factory('turn.service', turnService);

  // Inject any dependencies that this service needs /////////////////////////
  turnService.$inject = ['$log','fleet.service'];

  // The factory function that defines this service //////////////////////////
  function turnService($log,fleetService) {
    var service = {
      firstTurn: firstTurn,
      nextTurn: nextTurn
    };

    return service;

    function firstTurn(fleets) {
      let t = new turn(1);
      t.initial = fleetService.arrayToDictionary(fleets);
      return t;
    }

    function nextTurn(prev) {
      let current;
      if(typeof prev === 'object') {
        current = new turn(prev.turn + 1);
        prev.next = current;
      }
      else {
        current = new turn(0);
      }

      return current;
    }

    function turn(t) {
      this.turn = t;
      this.initial = {};
      this.delta = {};
      this.next = null;
    }
  }
})();
