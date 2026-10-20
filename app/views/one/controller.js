app.controller('one', function ($scope, api) {

    $scope.reload = function () {
        api.get('api/data.json').then(function (result) {
            $scope.info = result.info
        })
    }
    $scope.reload()
})
