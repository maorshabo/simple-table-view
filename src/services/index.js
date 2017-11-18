import angular from 'angular';
import Tournament from './tournament.service';

export default angular.module('app.services', [])
    .service('TournamentService', Tournament)
    .name;
