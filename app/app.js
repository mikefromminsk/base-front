var app = angular.module('app', ['ngMaterial', 'ngAnimate', 'ngAria', 'ui.router'])

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('one', {
            url: '/one',
            templateUrl: 'views/one/index.html',
            controller: 'one',
        })
        .state('two', {
            url: '/two',
            templateUrl: 'views/two/index.html',
            controller: 'two',
        })

    $urlRouterProvider.otherwise('/one')
    $locationProvider.hashPrefix('')
})

function clone(array) {
    return array ? JSON.parse(JSON.stringify(array)) : null
}
