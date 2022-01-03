
(function () {
    'use strict';
    angular
        .module("demoApp")
        .filter('sortByFirstName', sortFilter);

    function sortFilter() {
        return function (array) {
            function compare(a, b) {
                return a.firstName.localeCompare(b.firstName)
            }
            return array.sort(compare);
        }
    }
})();