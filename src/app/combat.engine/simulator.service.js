////////////////////////////////////////////////////////////////////////////////
// Project: BE2
// Filename: simulator.service.js
// Description: The module to handle the combat simulation
// Author: Justin Lane
// Copyright: Copyright (C) 2018
////////////////////////////////////////////////////////////////////////////////
(function() {
    'use strict';

    // Setup the component and the module it belongs to ////////////////////////
    /**
    * This service can be injected as combatSimulator
    */
    angular
        .module('combatEngine.core')
        .factory('combatSimulator', combatSimulator);

    // Inject any dependencies that this services needs ////////////////////////
    combatSimulator.$inject = ['$log','turn.service'];

    // The factory function that defines this service //////////////////////////
    /**
    * This service handles the combat simulation and the worker threads
    * that get generated to make it all happen.
    */
    function combatSimulator($log,turnService) {
      // Define the factory object to be returned
      var service = {
          doCombat: doCombat
      };

      // Return the factory object
      return service;

      // Function Literals /////////////////////////////////////////////////////
      /**
      * Setup the combat log and initial unit state for the first turn
      */
      function doCombat(combatants) {
        // The combat log class
        let Combat = function(name) {
          this.name = name;
          this.turns = [];
          this.lastTurn = null;
        };

        Combat.prototype.setup = function(fleets) {
          // Get the attacking and defending fleets.  This will be more generic
          // and flexible in relase.
          this.fleets = fleets;
          let attacker = fleets[0];
          let defender = fleets[1];

          // Setup the first turns initial state
          let turn = turnService.firstTurn(this.fleets);
          this.lastTurn = turn;
          this.turns.unshift(turn);
        };

        Combat.prototype.runTurn = function() {
          let turn = turnService.nextTurn(this.lastTurn);
          this.lastTurn = turn;
          this.turns.unshift(turn);
        }

        // The combat object
        let combat = new Combat("Test");

        // Setup combat
        combat.setup(combatants);
        combat.runTurn();

        $log.info(combat);

        return combat;
      }
    }
})();
