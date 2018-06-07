(function() {
    'use strict';

    angular
        .module('app.core')
        .component('appEngine', appEngine());

    /* @ngInject */
    function appEngine() {
        var component = {
            templateUrl: 'app/engine.html',
            controller: appEngineCtl,
        };

        return component;
    }

    appEngineCtl.$inject = ['$log'];

    /* @ngInject */
    function appEngineCtl($log) {
      let $ctrl = this;

      $ctrl.$onInit = function() {
        $log.info('appEngineCtl $onInit');
      };
    }
})();
