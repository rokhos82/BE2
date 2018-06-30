(function() {
  'use strict';

  class Unit {
    constructor() {
      this["general"] = {
        name: "",
        type: "",
        size: 0
      };
      this["hull"] = {
        max: 0,
        current: 0
      };
      this["shield"] = {
        max: 0,
        current: 0
      };
      this["capture"] = {
        capture: 0,
        repel: 0
      };
      this["direct-fire"] = [];
      this["indirect-fire"] = [];
    }

    get id() {
      return this.general.name;
    }
  }

  angular
    .module('mobius.core')
    .factory('unit.service', unitService);

  unitService.$inject = ['$log'];

  /* @ngInject */
  function unitService($log) {
    var service = {
      create: create
    };

    return service;

    function create() {

    }
  }
})();
