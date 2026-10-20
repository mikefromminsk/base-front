var app = angular.module('app', ['ngMaterial', 'ngAnimate', 'ngAria', 'ui.router'])

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('one', {
            url: '/one',
            templateUrl: 'views/one/index.html',
            controller: 'one',
        })
        .state('two', {
            url: '/two',
            templateUrl: 'views/two/index.html',
            controller: 'two',
        })

    $urlRouterProvider.otherwise('/one')
    $locationProvider.hashPrefix('')
})

function clone(array) {
    return array ? JSON.parse(JSON.stringify(array)) : null
}

app.run(function ($rootScope) {

    $rootScope.queryParams = {}
    new URLSearchParams(window.location.search).forEach(function (value, key) {
        $rootScope.queryParams[key] = value
    })

    $rootScope.filter = function (array, field, query) {
        if (typeof query === 'string') {
            query = query.toLowerCase()
            return array.filter(i => i[field].toLowerCase().includes(query))
        }
        return []
    }

    $rootScope.stop = function ($event) {
        $event.stopPropagation()
    }

    $rootScope.formatDatetime = function (value) {
        if (value == null) return ''
        let d = new Date(value)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        const h = String(d.getHours()).padStart(2, '0')
        const i = String(d.getMinutes()).padStart(2, '0')
        return `${dd}.${m}.${y} ${h}:${i}`
    }

    $rootScope.formatTime = function (value) {
        if (value == null) return ''
        let d = new Date(value)
        const h = String(d.getHours()).padStart(2, '0')
        const i = String(d.getMinutes()).padStart(2, '0')
        return `${h}:${i}`
    }

    $rootScope.formatDate = function (value) {
        if (value == null) return ''
        let d = new Date(value)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        return `${dd}.${m}.${y}`
    }

    $rootScope.round = function (num, precision) {
        const factor = Math.pow(10, precision != null ? precision : 4)
        return Math.floor(num * factor) / factor
    }

    $rootScope.formatCount = function (number, precision) {
        if (typeof number === 'string')
            number = parseFloat(number)
        if (typeof number === 'number' && !isNaN(number)) {
            if (number === 0) return '0'
            return $rootScope.round(number, precision).toLocaleString('en', {
                minimumFractionDigits: 0,
                maximumFractionDigits: precision || 2
            })
        }
        return '0'
    }

    $rootScope.formatPercent = function (number, precision) {
        if (number == 0 || isNaN(number) || number == null) return "0%"
        return $rootScope.round(number, precision || 2) + "%"
    }

    $rootScope.percentColor = function (number) {
        if (number === undefined) return ""
        if (number > 0) return {'text-green': true}
        return {'text-red': true}
    }

    $rootScope.priceColor = function (value) {
        if (!value) return {'text-gray': true}
        if (value > 0) return {'text-green': true}
        return {'text-red': true}
    }

    $rootScope.stringToColor = function (str) {
        if (str == null) return 'var(--black)'
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return `hsl(${Math.abs(hash % 360)}, 65%, 50%)`;
    }
})

