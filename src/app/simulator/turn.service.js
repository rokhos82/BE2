(function() {
    'use strict';

    class Turn {
      constructor(t) {
        this.turn = t;
        this.initial = {};
        this.delta = {};
      }
    }

    angular
        .module('mobius.simulator')
        .factory('turn.service', turnService);

    turnService.$inject = ['$log'];

    function turnService($log) {
        var service = {
            initial: initial,
            next: next
        };

        return service;

        function initial() {

        }

        function next(curTurn) {

        }
    }
})();
