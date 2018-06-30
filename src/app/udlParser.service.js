(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('udlParser', udlParser);

    udlParser.$inject = ['$log'];

    /* @ngInject */
    function udlParser($log) {
        var service = {
            parseUDL: parseUDL
        };

        let weaponRegex = /\[(.*?)\]/gi;
        let captureRegex = /\[(capture .+?)\]/gi;
        let repelRegex = /\[(repel .+?)\]/gi;

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

        return service;

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
            launchers: offset++,
            capture: offset++
          };

          let unit = {
            general: {},
            shield: {},
            hull: {},
            capture: {},
            "direct-fire": [],
            "indirect-fire": []
          };

          let udlArray = udlString.split(',');

          unit.general.name = udlArray[offsets.name];
          unit.general.type = udlArray[offsets.type];
          unit.general.size = parseInt(udlArray[offsets.size]);
          unit.shield.max = parseInt(udlArray[offsets.shieldMax]);
          unit.shield.current = parseInt(udlArray[offsets.shieldCur]);
          unit.hull.max = parseInt(udlArray[offsets.hullMax]);
          unit.hull.current = parseInt(udlArray[offsets.hullCur]);

          parseTags(udlArray[offsets.unitTags],unit.general);
          parseTags(udlArray[offsets.shieldTags],unit.shield);
          parseTags(udlArray[offsets.hullTags],unit.hull);

          parseCapture(udlArray[offsets.capture],unit.capture);

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

        function parseCapture(captureString,captureObj) {
          let captureReg = new RegExp(captureRegex);
          let repelReg = new RegExp(repelRegex);

          let captures;
          while((captures = captureReg.exec(captureString)) !== null) {
            $log.info(captures[1]);
          }
          let repels;
          while((repels = repelReg.exec(captureString)) !== null) {
            $log.info(repels[1]);
          }
        }
    }
})();
