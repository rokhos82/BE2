(function() {
    'use strict';

    const {ipcRenderer} = require('electron');
    const {fileEvents} = require('../events.js');

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

    appEngineCtl.$inject = ['$log','$scope'];

    /* @ngInject */
    function appEngineCtl($log,$scope) {
      let $ctrl = this;

      $ctrl.file = "";

      $ctrl.$onInit = function() {
        $log.info('appEngineCtl $onInit');
        $log.info('registering fileOpened handler');
        ipcRenderer.on(fileEvents.fileOpened,fileOpened);
      };

      $ctrl.onOpenFile = function() {
        $log.info('onOpenFile');
        ipcRenderer.send(fileEvents.fileOpen);
      }

      function fileOpened(event,contents) {
        $ctrl.file = contents;
        $scope.$apply();
      };
    }
})();
