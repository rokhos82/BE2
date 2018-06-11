(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('combatSimulator', combatSimulator);

    combatSimulator.$inject = ['$log'];

    /* @ngInject */
    function combatSimulator($log) {
        var service = {
            doCombat: doCombat
        };

        return service;

        function doCombat(combatants) {
          $log.info(combatants);
          return combatants;
        }
    }
})();
