import angular from 'angular';
import AppComponent from './app';
import ResultsTableComponent from './resultsTable';
import PaginationComponent from './pagination';

export default angular.module('app.components', [
    AppComponent,
    ResultsTableComponent,
    PaginationComponent,
]).name;