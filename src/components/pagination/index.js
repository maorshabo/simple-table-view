import angular from 'angular';

import controller from './pagination.controller';
import template from './pagination.html';
// import './app.scss';

let paginationComponent = {
    restrict: 'E',
    template,
    controller,
    controllerAs: 'vm'
};

const MODULE_NAME = 'components.pagination';

angular.module(MODULE_NAME, [])
    .component('pagination', paginationComponent)
;

export default MODULE_NAME;