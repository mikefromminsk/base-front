var PLUGINS_STORAGE_ITEM_NAME = 'plugins'

function pluginList() {
    return JSON.parse(localStorage.getItem(PLUGINS_STORAGE_ITEM_NAME) || '[]')
}

function pluginUrl(item, file) {
    var path = item.path || 'views/' + item.name
    var root = ''
    if (path.startsWith('http')) {
        root = path
        path = ''
    } else if (path.startsWith('/')) {
        path = path.substring(1)
    }
    return root + path + '/' + file + (item.version ? '?v=' + item.version : '')
}

app.service('plugins', function () {
    this.all = function () { return pluginList() }

    this.has = function (name) {
        return pluginList().some(function (item) { return item.name === name })
    }

    this.toggle = function (item, on) {
        var list = pluginList().slice()
        if (on) {
            if (!list.some(function (entry) { return entry.name === item.name })) {
                list.push(item)
            }
        } else {
            list = list.filter(function (entry) { return entry.name !== item.name })
        }
        localStorage.setItem(PLUGINS_STORAGE_ITEM_NAME, JSON.stringify(list))
        location.reload()
    }
})

app.config(function ($stateProvider) {
    pluginList().filter(function (item) {
        return !$stateProvider.stateRegistry.get(item.name)
    }).forEach(function (item) {
        $stateProvider.state(item.name, {
            url: '/' + item.name,
            templateUrl: pluginUrl(item, 'index.html'),
            controller: item.name,
            resolve: {params: function ($stateParams) { return $stateParams }},
        })
    })
})

pluginList().forEach(function (item) {
    if (document.querySelector('script[src="' + pluginUrl(item, 'controller.js') + '"]')) return
    document.write('<link rel="stylesheet" href="' + pluginUrl(item, 'style.css') + '">')
    document.write('<script src="' + pluginUrl(item, 'controller.js') + '"></script>')
})


app.controller('plugins', function ($scope, $mdDialog, plugins, $http) {

    $scope.catalog = []
    $scope.pluginList = []
    $scope.query = ''
    $scope.plugins = plugins

    $http.get('/views/info.json').then(function (list) {
        $scope.catalog = list.data || []
        $scope.search($scope.query)
    })

    $scope.search = function (query) {
        var text = (query || '').toLowerCase()
        var list = $scope.catalog
        $scope.pluginList = text ? list.filter(function (item) {
            return (item.title + ' ' + item.name + ' ' + (item.description || '')).toLowerCase().includes(text)
        }) : list
    }

    $scope.toggle = function (item) {
        if (item.installed === false) return
        plugins.toggle(item, !plugins.has(item.name))
    }

    $scope.close = function () {
        $mdDialog.cancel()
    }

    $scope.search('')
})
