app.controller('plugins', function ($scope, $mdDialog, plugins) {

    $scope.items = plugins.all().map(function (name) {
        return {name: name, enabled: plugins.has(name)}
    })

    $scope.close = function () {
        $mdDialog.cancel()
    }

    $scope.toggle = function (item) {
        plugins.toggle(item.name, item.enabled)
    }
})
