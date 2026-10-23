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

app.service('api', function ($http, $q, toast) {

    function prepareUrl(url) {
        if (url.startsWith('http')) return url
        if (url.startsWith('/')) url = url.substring(1)
        return url
    }

    function unwrap(response) {
        return response.data
    }

    function catchError(response) {
        toast.error(response.data?.message || 'Ошибка запроса')
        return $q.reject(response)
    }

    this.get = function (url, params) {
        return $http.get(prepareUrl(url), {params: Object.assign({}, params)})
            .then(unwrap)
            .catch(catchError)
    }

    this.post = function (url, data, params) {
        return $http.post(prepareUrl(url), data, {params: Object.assign({}, params)})
            .then(unwrap)
            .catch(catchError)
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
            isolateScope: false,
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
