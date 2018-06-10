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

    appEngineCtl.$inject = ['$log','$scope',"udlParser"];

    /* @ngInject */
    function appEngineCtl($log,$scope,parser) {
      let $ctrl = this;

      $ctrl.file = "";
      $ctrl.unitJson = null;

      $ctrl.loadUDL = loadUDL;

      $ctrl.$onInit = function() {
        ipcRenderer.on(fileEvents.fileOpened,fileOpened);
      };

      $ctrl.onOpenFile = function() {
        $log.info('onOpenFile');
        ipcRenderer.send(fileEvents.fileOpen);
      }

      function fileOpened(event,contents) {
        $ctrl.file = contents;
        $scope.$apply();
      }

      function loadUDL(udlString) {
        $ctrl.unitJson = parser.parseUDL(udlString);
      }
    }
})();
