(function() {
  'use strict';

  angular
    .module('combatEngine.core')
    .factory('unit.service', unitService);

  unitService.$inject = ['$log','udlParser'];

  /* @ngInject */
  function unitService($log,parser) {
    var service = {
      create: create,
      getID: getID,
      isAlive: isAlive
    };

    return service;

    /**
    * Create a new unit object
    */
    function create(udl) {
      return parser.parseUDL(udl);
    }

    /**
    * Return the identifier for the unit
    */
    function getID(unit) {
      return unit.general.name;
    }

    /**
    * 
    */
    function isAlive(unit) {
      if(unit.hull.current > 0) {
        return true;
      }
      return false
    }
  }
})();
