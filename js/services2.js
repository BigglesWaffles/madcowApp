(function () {
    'use strict';
    angular
        .module("demoApp")
        .service('userService', userService);

    function userService() {
        var collection = [
            { firstName: 'Thomas', lastName: 'Ochman' },
            { firstName: 'Amber', lastName: 'Wilkie' },
            { firstName: 'Raoul', lastName: 'Diffouo' }
        ];
        return {
            users: function () {
                return collection;
            },
            add: function (object) {
                collection.push(object);
            }
        }
    }
})();