app.controller('hello', function ($scope, api, params, dialog, $mdDialog) {

    $scope.params = params
    $scope.items = []

    $scope.close = function () {
        $mdDialog.cancel()
    }

    $scope.openAsDialog = function ($event) {
        dialog('hello', 'views/hello', {id: 7}, $event)
    }

    api.get('api/data.json').then(function (result) {
        $scope.items = result.info.items
    })
})
