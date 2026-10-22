app.controller('plugins', function ($scope, $mdDialog, plugins, api) {

    var marketUrl = 'api/plugins.json'

    $scope.items = []
    $scope.query = ''

    $scope.search = function (query) {
        api.get(marketUrl, {q: query}).then(function (list) {
            $scope.items = list
        })
    }

    $scope.toggle = function (item) {
        plugins.toggle(item, !plugins.has(item.name))
    }

    $scope.close = function () {
        $mdDialog.cancel()
    }

    $scope.search('')
})
