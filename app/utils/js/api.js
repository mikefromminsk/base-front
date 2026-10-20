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
