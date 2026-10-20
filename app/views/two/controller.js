app.controller('two', function ($scope, api) {

    $scope.reload = function () {
        api.get('api/data.json').then(function (result) {
            $scope.items = result.list.items
        })
    }
    $scope.reload()
})
