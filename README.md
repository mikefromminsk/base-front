## Как запустить

Первый блок — зависимости, нужен один раз:

```bash
cd app
npm install
```

Второй блок — запуск:

```bash
docker compose up -d
```

Открыть <http://localhost:8080>.

`npm install` обязателен — `index.html` берёт angular из `node_modules`.
Без Docker: `php -S localhost:8080 -t app`.

## Что внутри

```
app/
├── index.html      вход: стили, скрипты, шапка, ui-view
├── app.js          модуль, роутер, хелперы
├── controller.js   openPage, openDialog, openSheet
├── api/data.json   данные для экранов
├── utils/js/       api.js (запросы), material.js (toast, dialog, sheet)
├── utils/css/      цвета, база, утилиты
├── utils/fonts/    шрифт Inter
├── icon/           svg-иконки
└── views/          one, two, dialog, sheet
```

Экран — папка в `views/` с `index.html` и `controller.js`. Остальное
переиспользуемое.

## Как делается запрос

Сервис `api` это более удобная обёртка над $http для GET и POST запросов.

```js
$scope.reload = function () {
    api.get('api/data.json').then(function (result) {
        $scope.info = result.info
    }).catch(function () {
    })
}
$scope.reload()
```

POST отличается только передачей праметров:

```js
api.post('api/data.json', {title: 'Новый пункт'}).then(function (result) {
    $scope.info = result.info
})
```


## Вёрстка

Классы — сокращения из набора утилит `app/utils/css/shorts.css` (по мотивам
Tailwind), цвета — из `colors.css`, окна и тосты — из Angular Material.

`p16`/`ph16`/`pv16` — отступы, `m16` — внешний отступ, `gap8` — расстояние
между элементами, `r16` — скругление, `img24` — размер картинки, `text4` —
размер шрифта, `acc` — выравнивание по центру, `back-gray100` — цвет,
`row`/`col`/`flex` — раскладка.

Полный список — в `shorts.css` и `colors.css`.

## Диалоги на весь экран и снизу экрана

Фабрики `dialog` и `sheet` из `app/utils/js/material.js` упрощают вызов диалогов.

```js
$scope.openDialog = function ($event) {
    dialog('dialog', 'views/dialog', {id: 1}, $event).catch(function () {
    })
}
$scope.openSheet = function ($event) {
    sheet('sheet', 'views/sheet', {}, $event).catch(function () {
    })
}
```

## Как добавить страницу

1. Создать `app/views/<name>/index.html` и `app/views/<name>/controller.js`.
2. Положить данные в `app/api/data.json` отдельным ключом.
3. Добавить state в `app/app.js`:

```js
.state('<name>', {
    url: '/<name>',
    templateUrl: 'views/<name>/index.html',
    controller: '<name>',
})
```

4. Подключить контроллер в `app/index.html` и кнопку в шапку:

```html
<button class="button2" ng-click="openPage('<name>')">Заголовок</button>
```
