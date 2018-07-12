(function() {
  'use strict';

  angular
    .module('combatEngine.core')
    .factory('combatLog', combatLog);

  combatLog.$inject = ['$log'];

  /* @ngInject */
  function combatLog($log) {
    var service = {
      create: create
    };

    return service;

    function create() {
    }
  }
})();
