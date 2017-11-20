import angular from 'angular';
import 'bootstrap';
import Components from './components';
import Services from './services';
import Utils from './utils/hightlight.filter';

import './style/main.scss';
import 'font-awesome/css/font-awesome.min.css';


angular.module('app', [
    Components,
    Services,
    Utils
]);