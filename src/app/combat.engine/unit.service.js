(function() {
  'use strict';

  angular
    .module('combatEngine.core')
    .factory('unit.service', unitService);

  unitService.$inject = ['$log','udlParser'];

  /* @ngInject */
  function unitService($log,parser) {
    var service = {
      create: create
    };

    return service;

    function create(udl) {
      return parser.parseUDL(udl);
    }
  }
})();
