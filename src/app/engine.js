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

      let weaponRegex = /\[.*?\]/gi;
      let volleyRegex = /volley ([0-9]+)/gi;
      let targetRegex = /target ([0-9]+)/gi;
      let yieldRegex = /yield ([0-9]+)/gi;
      let sizeRegex = /size ([0-9]+)/gi;

      let tagRegex = [
        {
          name: "volley",
          regex: /volley ([0-9]+)/gi,
          parse: parseInt
        },
        {
          name: "target",
          regex: /target ([0-9]+)/gi,
          parse: parseInt
        },
        {
          name: "yield",
          regex: /yield ([0-9]+)/gi,
          parse: parseInt
        },
        {
          name: "size",
          regex: /size ([0-9]+)/gi,
          parse: parseInt
        },
        {
          name: "defense",
          regex: /defense ([0-9]+)/gi,
          parse: parseInt
        },
        {
          name: "resist",
          regex: /resist ([0-9]+)/gi,
          parse: parseInt
        },
        {
          name: "flicker",
          regex: /flicker ([0-9]+)/gi,
          parse: parseInt
        },
        {
          name: "deflect",
          regex: /deflect ([0-9]+)/gi,
          parse: parseInt
        },
        {
          name: "warhead",
          regex: /warhead ([0-9]+)/gi,
          parse: parseInt
        },
        {
          name: "count",
          regex: /count ([0-9]+)/gi,
          parse: parseInt
        }
      ];

      $log.info(tagRegex);

      $ctrl.file = "";
      $ctrl.unitJson = null;

      $ctrl.loadUDL = loadUDL;

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
      }

      function loadUDL(udlString) {
        $ctrl.unitJson = parseUDL(udlString);
      }

      // Beam Frigate,starship,6,defense 15,0,0,,9,9,,[volley 4 target 15][volley 4 target 15],[volley 4 size 1 target 10 yield 10]
      function parseUDL(udlString) {
        let offset = 0;
        let offsets = {
          name: offset++,
          type: offset++,
          size: offset++,
          unitTags: offset++,
          shieldMax: offset++,
          shieldCur: offset++,
          shieldTags: offset++,
          hullMax: offset++,
          hullCur: offset++,
          hullTags: offset++,
          batteries: offset++,
          launchers: offset++
        };

        let unit = {
          general: {},
          shield: {},
          hull: {},
          "direct-fire": [],
          "indirect-fire": []
        };

        let udlArray = udlString.split(',');

        unit.general.name = udlArray[offsets.name];
        unit.general.type = udlArray[offsets.type];
        unit.general.size = udlArray[offsets.size];
        unit.shield.max = udlArray[offsets.shieldMax];
        unit.shield.current = udlArray[offsets.shieldCur];
        unit.hull.max = udlArray[offsets.hullMax];
        unit.hull.current = udlArray[offsets.hullCur];

        parseTags(udlArray[offsets.unitTags],unit.general);
        parseTags(udlArray[offsets.shieldTags],unit.shield);
        parseTags(udlArray[offsets.hullTags],unit.hull);

        let batteryString = udlArray[offsets.batteries];
        if(batteryString.length > 0) {
          let batteryRegex = new RegExp(weaponRegex);
          batteryString.match(batteryRegex).forEach(function(element) {
            let battery = {};
            parseTags(element,battery);
            unit["direct-fire"].push(battery);
          });
        }

        let launcherString = udlArray[offsets.launchers];
        if(launcherString.length > 0) {
          let launcherRegex = new RegExp(weaponRegex);
          launcherString.match(launcherRegex).forEach(function(element) {
            let launcher = {};
            parseTags(element,launcher);
            unit["indirect-fire"].push(launcher);
          });
        }

        return unit;
      }

      function parseTags(tagString,obj) {
        tagRegex.forEach((tag) => {
          let reg = new RegExp(tag.regex);
          if(reg.test(tagString)) {
            obj[tag.name] = tag.parse(new RegExp(tag.regex).exec(tagString)[1]);
          }
        });
      }
    }
})();
