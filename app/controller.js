app.controller('main', function ($scope, dialog, sheet, plugins) {

    $scope.openDialog = function ($event) {
        dialog('dialog', 'views/dialog', {id: 1}, $event).catch(function () {
        })
    }

    $scope.openSheet = function ($event) {
        sheet('sheet', 'views/sheet', {}, $event).catch(function () {
        })
    }

    $scope.plugins = plugins

    $scope.openPlugins = function ($event) {
        dialog('plugins', 'views/plugins', {}, $event).catch(function () {
        })
    }
})
