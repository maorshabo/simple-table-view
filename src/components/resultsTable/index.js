import angular from 'angular';
import controller from './resultsTable.controller';
import template from './resultsTable.html';
import './resultsTable.scss';

let resultsComponent = {
    restrict: 'E',
    bindings: {
        rows: '<',
        loadPlayers: '&',
        totalPlayers: '<'
    },
    template,
    controller,
    controllerAs: 'vm'
};

const MODULE_NAME = 'components.resultsTable';

angular.module(MODULE_NAME, [])
    .component('resultsTable', resultsComponent)
;

export default MODULE_NAME;