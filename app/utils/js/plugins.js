var pluginList = ['hello']

function pluginEnabled() {
    try {
        return JSON.parse(localStorage.getItem('plugins') || '[]')
    } catch (error) {
        return []
    }
}

app.service('plugins', function () {
    this.all = function () { return pluginList }
    this.has = function (name) { return pluginEnabled().includes(name) }

    this.toggle = function (name, on) {
        var list = pluginEnabled()
        if (on && !list.includes(name)) list.push(name)
        if (!on) list.splice(list.indexOf(name), 1)
        localStorage.setItem('plugins', JSON.stringify(list))
        location.reload()
    }
})

var pluginLoad = function (name) {
    return new Promise(function (done) {
        var style = document.createElement('link')
        style.rel = 'stylesheet'
        style.href = 'views/' + name + '/style.css'
        document.head.appendChild(style)

        var script = document.createElement('script')
        script.src = 'views/' + name + '/controller.js'
        script.onload = function () { done(name) }
        script.onerror = function () { done(null) }
        document.head.appendChild(script)
    })
}

var pluginNames = pluginEnabled().filter(function (name) { return pluginList.includes(name) })

Promise.all(pluginNames.map(pluginLoad)).then(function (loaded) {
    var module = angular.module('app')

    module.config(function ($stateProvider) {
        loaded.filter(Boolean).forEach(function (name) {
            $stateProvider.state(name, {
                url: '/' + name,
                templateUrl: 'views/' + name + '/index.html',
                controller: name,
                resolve: {params: ['$stateParams', function (stateParams) { return stateParams }]},
            })
        })
    })

    module.run(function ($rootScope) { $rootScope.plugins = pluginNames })

    angular.bootstrap(document.body, ['app'])
})
