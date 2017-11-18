import angular from 'angular';
import controller from './app.controller';
import template from './app.html';
import './app.scss';

let appComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

const MODULE_NAME = 'components.app';

angular.module(MODULE_NAME, [])
  .component('app', appComponent)
;

export default MODULE_NAME;