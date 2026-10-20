app.controller('main', function ($scope, $state, dialog, sheet) {

    $scope.openPage = function (page) {
        $state.go(page)
    }

    $scope.openDialog = function ($event) {
        dialog('dialog', 'views/dialog', {id: 1}, $event).catch(function () {
        })
    }

    $scope.openSheet = function ($event) {
        sheet('sheet', 'views/sheet', {}, $event).catch(function () {
        })
    }
})
