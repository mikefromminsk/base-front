app.controller('sheet', function ($scope, api, $mdBottomSheet) {

    $scope.close = function () {
        $mdBottomSheet.cancel()
    }

    $scope.items = []

    $scope.reload = function () {
        api.get('api/data.json').then(function (result) {
            $scope.items = result.list.items
        })
    }
    $scope.reload()
})
