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

angular.module('app').config(function ($stateProvider) {
    pluginList().filter(function (item) {
        return item.page !== false
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
    document.write('<link rel="stylesheet" href="' + pluginUrl(item, 'style.css') + '">')
    document.write('<script src="' + pluginUrl(item, 'controller.js') + '"></script>')
})
