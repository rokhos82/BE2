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

    appEngineCtl.$inject = ['$log','$scope',"combatSimulator","udlParser"];

    /* @ngInject */
    function appEngineCtl($log,$scope,simulator,parser) {
      let $ctrl = this;

      $ctrl.file = "";
      $ctrl.unitJson = null;

      $ctrl.loadUDL = loadUDL;
      $ctrl.loadAttacker = loadAttacker;
      $ctrl.loadDefender = loadDefender;
      $ctrl.fight = fight;

      $ctrl.$onInit = function() {
        ipcRenderer.on(fileEvents.fileOpened,fileOpened);
      };

      $ctrl.onOpenFile = function() {
        $log.info('onOpenFile');
        ipcRenderer.send(fileEvents.fileOpen);
      }

      function fight() {
        $ctrl.combatOutput = simulator.doCombat([
          {
            name: "Attackers",
            units: [$ctrl.attacker]
          },
          {
            name: "Defenders",
            units: [$ctrl.defender]
          }
        ]);
      }

      function fileOpened(event,contents) {
        $ctrl.file = contents;
        $scope.$apply();
      }

      function loadUDL(udlString) {
        $ctrl.unitJson = parser.parseUDL(udlString);
      }

      function loadAttacker(udlString) {
        $ctrl.attacker = parser.parseUDL(udlString);
      }

      function loadDefender(udlString) {
        $ctrl.defender = parser.parseUDL(udlString);
      }
    }
})();
