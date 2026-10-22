app.controller('main', function ($scope, $rootScope, api, dialog, sheet, plugins) {

    $rootScope.market = []

    $scope.pluginList = plugins.all()
    $scope.plugins = plugins


    api.get('api/plugins.json').then(function (list) {
        $rootScope.market = list
    })

    $scope.openDialog = function ($event) {
        dialog('dialog', 'views/dialog', {id: 1}, $event).catch(function () {
        })
    }

    $scope.openSheet = function ($event) {
        sheet('sheet', 'views/sheet', {}, $event).catch(function () {
        })
    }

    $scope.openPlugins = function ($event) {
        dialog('plugins', 'views/plugins', {}, $event).catch(function () {
        })
    }
})
