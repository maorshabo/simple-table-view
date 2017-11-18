import angular from 'angular';

function hightlight($sce) {
    "ngInject";
    return function(text, phrase) {
        text = text.toString();
        if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'), '<span class="highlighted">$1</span>');
        return $sce.trustAsHtml(text)
    }
}

export default angular.module('app.utils', [])
.filter('highlight', hightlight).name;