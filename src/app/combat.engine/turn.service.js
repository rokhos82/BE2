////////////////////////////////////////////////////////////////////////////////
// Project: BE2
// Filename: turn.service.js
// Description: The module to handle the unit services
// Author: Justin Lane
// Copyright: Copyright (C) 2018
////////////////////////////////////////////////////////////////////////////////
(function() {
  'use strict';

  // Turn Class //////////////////////////////////////////////////////////////
  class Turn {
    constructor(t) {
      this.turn = t;
      this.initial = {};
      this.delta = {};
    }

    get fleets() {
    }

    change() {}

    next() {
      // Apply the delta to the initial and return the new object
      let t = new Turn(this.turn+1);
    }
  }

  // Setup the component and the module it belongs to ////////////////////////
  angular
    .module('combatEngine.core')
    .factory('turn.service', turnService);

  // Inject any dependencies that this service needs /////////////////////////
  turnService.$inject = ['$log'];

  // The factory function that defines this service //////////////////////////
  function turnService($log) {
    var service = {
      initial: initial,
      next: next
    };

    return service;

    function initial() {
      return new Turn(0);
    }

    function next(curTurn) {
    }
  }
})();
