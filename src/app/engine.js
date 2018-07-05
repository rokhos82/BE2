////////////////////////////////////////////////////////////////////////////////
// Project: BE2
// Filename: engine.js
// Description: This is the main component for the combat simulator and
//  includes the bulk of the UI.
// Author: Justin Lane
// Copyright: Copyright (C) 2018
////////////////////////////////////////////////////////////////////////////////
(function() {
    'use strict';

    // Import modules and libraries ////////////////////////////////////////////
    const {ipcRenderer} = require('electron');
    const {fileEvents} = require('../events.js');

    // Setup the component and the module it belongs to ////////////////////////
    /**
    * This component can be used in HTML as <app-engine></app-engine>
    */
    angular
        .module('app.core')
        .component('appEngine', appEngine());

    // The factory that defines the appEngine component ////////////////////////
    function appEngine() {
        var component = {
            templateUrl: 'app/engine.html',
            controller: appEngineCtl,
        };

        return component;
    }

    // Inject any dependencies for this component //////////////////////////////
    appEngineCtl.$inject = ['$log','$scope',"combatSimulator","unit.service"];

    /**
    * This is the controller function for the appEngine component.  It can
    * be referenced via $ctrl in HTML.
    */
    function appEngineCtl($log,$scope,simulator,$unit) {
      // A reference to this, meaning the controller function, for use
      // in other function literals.
      let $ctrl = this;

      // Model objects for the HTML to use
      $ctrl.file = "";
      $ctrl.unitJson = null;

      // Functions for the HTML to access for user interactions
      $ctrl.fight = fight;
      $ctrl.loadUDL = loadUDL;
      $ctrl.loadAttacker = loadAttacker;
      $ctrl.loadDefender = loadDefender;
      $ctrl.onOpenFile = onOpenFile;

      // Handles initializing the controller.
      $ctrl.$onInit = function() {
        // IPC Event Handler Registration
        ipcRenderer.on(fileEvents.fileOpened,fileOpened);
      };

      /**
      * This function assembles the fleets that will be fighting
      * and passes them to the combatSimulator service.
      */
      function fight() {
        // Right now there are only two fleets and the names are hard coded.
        // Will eventually have this be 2 or more fleets with custom names
        // loaded from files or imported via another method.
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

      /**
      * Handles openning a file from the local filesystem.
      * @param {object} event - The event object that is being handled.
      * @param {string} contents - The contents of the file that was openned.
      */
      function fileOpened(event,contents) {
        $ctrl.file = contents;
        $scope.$apply();
      }

      /**
      * Handles importing the UDL string from the GUI.
      * @param {string} udlString - This is the UDL string for the unit.
      */
      function loadUDL(udlString) {
        $ctrl.unitJson = $unit.create(udlString);
      }

      /**
      * Handles loading the attacking fleet information from the GUI.
      * @param {string} udlString - The UDL strings for the fleet.
      */
      function loadAttacker(udlString) {
        // Currently this is a single unit UDL.  Will work on a full fleet
        // in the future.
        $ctrl.attacker = $unit.create(udlString);
      }

      /**
      * Handles loading the defending fleet information from the GUI.
      * @param {string} udlString - THe UDL strings for the fleet.
      */
      function loadDefender(udlString) {
        // Currently this is a single unit UDL.  Will work on a full fleet
        // in the future.
        $ctrl.defender = $unit.create(udlString);
      }

      /**
      * Handles the clicking of the open file button on the GUI.  Needs removed.
      */
      function onOpenFile() {
        $log.info('onOpenFile');
        ipcRenderer.send(fileEvents.fileOpen);
      }
    }
})();
