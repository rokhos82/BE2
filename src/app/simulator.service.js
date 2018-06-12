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
        .module('app.core')
        .factory('combatSimulator', combatSimulator);

    // Inject any dependencies that this services needs ////////////////////////
    combatSimulator.$inject = ['$log'];

    // The factory function that defines this service //////////////////////////
    /**
    * This service handles the combat simulation and the worker threads
    * that get generated to make it all happen.
    */+
    function combatSimulator($log) {
      // Define the factory object to be returned
      var service = {
          doCombat: doCombat
      };

      // Return the factory object
      return service;

      // Function Literals /////////////////////////////////////////////////////
      /**
      *
      */
      function doCombat(combatants) {
        $log.info(combatants);
        return combatants;
      }
    }
})();
