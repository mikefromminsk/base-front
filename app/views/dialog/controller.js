app.controller('dialog', function ($scope, api, $mdDialog, params) {

    $scope.close = function () {
        $mdDialog.cancel()
    }

    $scope.success = function (result) {
        setTimeout(function () {
            $mdDialog.hide(result)
        }, 100)
    }

    $scope.dialog = {title: "Диалог", id: params.id}
    $scope.items = []

    $scope.reload = function () {
        api.get('api/data.json').then(function (result) {
            $scope.dialog = result.dialog
            $scope.items = result.dialog.items
        })
    }
    $scope.reload()
})
