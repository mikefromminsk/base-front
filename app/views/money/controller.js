app.filter('money', function () {
    return function (value) {
        return Number(value || 0).toLocaleString('ru-RU') + ' руб.'
    }
})

app.service('clock', function () {
    this.now = function () {
        return new Date().toLocaleTimeString('ru-RU')
    }
})
