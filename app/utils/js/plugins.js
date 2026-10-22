var PLUGINS_STORAGE_ITEM_NAME = 'plugins'

function pluginList() {
    try {
        return JSON.parse(localStorage.getItem(PLUGINS_STORAGE_ITEM_NAME) || '[]')
    } catch (error) {
        return []
    }
}

function pluginUrl(item, file) {
    var path = item.path
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
        var list = pluginList()
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

function pluginLoad(item) {
    return new Promise(function (done) {
        if (item.style !== false) {
            var style = document.createElement('link')
            style.rel = 'stylesheet'
            style.href = pluginUrl(item, 'style.css')
            document.head.appendChild(style)
        }
        var script = document.createElement('script')
        script.src = pluginUrl(item, 'controller.js')
        script.onload = function () { done(item) }
        script.onerror = function () { done(null) }
        document.head.appendChild(script)
    })
}

Promise.all(pluginList().map(pluginLoad)).then(function (loaded) {
    angular.bootstrap(document.body, ['app'])
})
