app.service('toast', function ($mdToast) {
    function showMessage(message, styleClass = 'red-toast') {
        if (message == null) message = 'Ошибка'
        let spaceCount = message.split(' ').length + 1
        let delay = spaceCount / 4 * 1000
        if (delay < 2000) delay = 2000
        $mdToast.show($mdToast.simple()
            .toastClass(styleClass)
            .position('top right')
            .textContent(message)
            .hideDelay(delay))
    }

    this.success = function (message = 'Сохранено') {
        showMessage(message, 'green-toast')
    }

    this.error = function (message) {
        showMessage(message, 'red-toast')
    }
})

app.factory('dialog', function ($mdDialog) {
    return function (controller, template, params, event) {
        return $mdDialog.show({
            controller: controller,
            templateUrl: template + '/index.html',
            targetEvent: event || null,
            focusOnOpen: false,
            clickOutsideToClose: true,
            fullscreen: true,
            multiple: true,
            locals: {
                params: params || {}
            }
        })
    }
})

app.factory('sheet', function ($mdBottomSheet) {
    return function (controller, template, params, event) {
        return $mdBottomSheet.show({
            controller: controller,
            templateUrl: template + '/index.html',
            clickOutsideToClose: true,
            escapeToClose: true,
            locals: {
                params: params || {}
            }
        })
    }
})
