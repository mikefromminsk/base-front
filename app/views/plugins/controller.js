app.controller('plugins', function ($scope, $mdDialog, plugins) {

    $scope.items = []
    $scope.query = ''

    $scope.search = function (query) {
        var text = (query || '').toLowerCase()
        var list = $scope.market || []
        $scope.items = text ? list.filter(function (item) {
            return (item.title + ' ' + item.name).toLowerCase().includes(text)
        }) : list
    }

    $scope.toggle = function (item) {
        plugins.toggle(item, !plugins.has(item.name))
    }

    $scope.close = function () {
        $mdDialog.cancel()
    }

    $scope.search('')
})
