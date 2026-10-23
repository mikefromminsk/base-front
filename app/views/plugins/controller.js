const PLUGINS_STORAGE_ITEM_NAME = 'plugins'
const PLUGINS_STORE_URL = 'http://localhost:8080/views/'

function pluginList() {
    return JSON.parse(localStorage.getItem(PLUGINS_STORAGE_ITEM_NAME) || '[]')
}

function pluginUrl(item, filename) {
    return PLUGINS_STORE_URL + item + '/' + filename
}

app.service('plugins', function () {
    this.all = function () {
        return pluginList()
    }

    this.has = function (name) {
        return pluginList().some(i => i === name)
    }

    this.url = function () {
        return PLUGINS_STORE_URL
    }

    this.toggle = function (name) {
        let list = pluginList().filter(i => i !== name)
        if (list.length === pluginList().length) list.push(name)
        localStorage.setItem(PLUGINS_STORAGE_ITEM_NAME, JSON.stringify(list))
        location.reload()
    }
})

app.config(function ($stateProvider) {
    pluginList().filter(function (name) {
        return !$stateProvider.stateRegistry.get(name)
    }).forEach(function (name) {
        $stateProvider.state(name, {
            url: '/' + name,
            templateUrl: pluginUrl(name, 'index.html'),
            controller: name,
        })
    })
})

pluginList().forEach(function (item) {
    if (document.querySelector('script[src="' + pluginUrl(item, 'controller.js') + '"]')) return
    document.write('<link rel="stylesheet" href="' + pluginUrl(item, 'style.css') + '">')
    document.write('<script src="' + pluginUrl(item, 'controller.js') + '"></script>')
})


app.controller('plugins', function ($scope, $mdDialog, plugins, $http) {

    $scope.plugins = plugins
    $scope.pluginList = plugins.all()

    $http.get(PLUGINS_STORE_URL + "/plugins/info.json").then(function (response) {
        $scope.catalog = response.data || []
        $scope.search()
    })

    $scope.search = function (query) {
        $scope.pluginList = $scope.catalog
        if (query)
            $scope.pluginList = $scope.pluginList
                .filter(i => (i.title + ' ' + i.name + ' ' + (i.description || '')).toLowerCase().includes(query.toLowerCase()))

    }

    $scope.close = function () {
        $mdDialog.cancel()
    }

    $scope.search('')
})
