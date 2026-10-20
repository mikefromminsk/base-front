# Фронтенд-болованка

AngularJS-шаблон: роутер, две страницы, модальное окно и нижний лист.

Данные лежат json-файлом в `app/api/` — сервер писать не нужно. Свой бэкенд
подключается заменой одного адреса.

---

## Как запустить

```bash
cd app
npm install
cd ..
docker compose up -d
```

Открыть `http://localhost:8080` — порт публичный по умолчанию.

Без Docker подойдёт любой статический сервер:

```bash
php -S localhost:8080 -t app
```

`npm install` обязателен: `index.html` тянет angular из `node_modules`, без
установки страница будет пустой. Порт меняется переменной `APP_PORT`.

## Как сделать из этого свой проект

Скопировать папку целиком — она самодостаточная.

Поменять `name` в `app/package.json` и заголовок в `app/index.html`.

Залить свои данные в `app/api/data.json` или подключить свой бэкенд заменой
адреса в вызовах `api.get(...)`.

Затем `npm install` и `docker compose up -d` — как выше.

---

## Что внутри

```
app/
├── index.html      точка входа: стили, скрипты, общий хедер, ui-view
├── app.js          модуль, роутер, утилиты на $rootScope
├── controller.js   оболочка: openPage, openDialog, openSheet
├── api/data.json   данные для всех экранов
├── utils/js/       api.js (запросы), material.js (toast, dialog, sheet)
├── utils/css/      цвета, база, утилиты, общие стили
├── utils/icon/     набор svg-иконок
└── views/          one, two, dialog, sheet
```

Каждый экран — папка в `views/` с `index.html` и `controller.js`. Всё
остальное переиспользуемое: сервис запросов, фабрики окон, утилиты
форматирования, набор утилит CSS.

Что ещё можно ужать — в [REFACTORING.md](REFACTORING.md), там только идеи.

---

## Экраны

В общем хедере четыре кнопки: **Страница один**, **Страница два**, **Диалог**,
**Лист**. Внутри страниц кнопок нет — только запрос и ответ.

| Экран | Что показывает |
|---|---|
| Страница один | `result.info` — заголовок и цифры |
| Страница два | `result.list.items` — список элементов |
| Диалог | `result.dialog` — заголовок и сообщения |
| Лист | `result.list.items` — список снизу |

---

## Как делается запрос

Сервис `api` в `app/utils/js/api.js` строит адрес относительным, поэтому
приложение работает из любой папки: `/`, `/app/`, `/my-project/`.

```js
$scope.reload = function () {
    api.get('api/data.json').then(function (result) {
        $scope.info = result.info
    })
}
$scope.reload()
```

Прогрессов нет — данные просто приходят в `$scope`. Ошибки сервис показывает
тостом сам.

Свой бэкенд подключается заменой адреса:
`api.get('api/data.json')` → `api.get('https://my.host/data')`.

---

## Утилиты

Они висят на `$rootScope` через `app.run()` в `app/app.js` — доступны в любом
контроллере и шаблоне, подключать ничего не нужно.

Сейчас это `queryParams`, `filter`, `stop`, `formatDatetime`, `formatTime`,
`formatDate`, `round`, `formatCount`, `currency`, `formatPrice`, `formatPercent`,
`percentColor`, `priceColor`, `stringToColor` и глобальная `clone`.

Новый хелпер — ещё одна функция в `run`, больше ничего трогать не надо.

---

## Вёрстка

Всё на утилитах из `utils/css/shorts.css` и `utils/css/colors.css`.

Общий хедер живёт в `app/index.html` вне `ui-view` — он одинаковый на всех
экранах. Внутри `ui-view` каждая страница рисует свой заголовок и данные.

```html
<div class="flex col">
    <div class="row acc ph16 pv8 gap8">
        <div class="flex text3">Заголовок</div>
    </div>

    <div class="flex col scroll p16 gap8">
        <div class="row acc p16 r16 back-gray100 gap8" ng-repeat="item in items">
            ...
        </div>
    </div>
</div>
```

---

## Общие контроллеры

`app/controller.js` — контроллер `main` на `<body ng-controller="main">`. Его
scope наследуют все страницы, поэтому общие действия объявлены один раз:

```js
$scope.openPage = function (page) {
    $state.go(page)
}
```

Контроллеры страниц отвечают только за свой запрос и свои данные.

---

## Окна: диалог и лист

Фабрики в `app/utils/js/material.js` устроены одинаково: имя контроллера,
папка с шаблоном, данные для `$scope.params`.

```js
$scope.openDialog = function ($event) {
    dialog('dialog', 'views/dialog', {id: 1}, $event).catch(function () {})
}

$scope.openSheet = function ($event) {
    sheet('sheet', 'views/sheet', {}, $event).catch(function () {})
}
```

`.catch()` обязателен: при закрытии по Esc или клику вне окна промис
отклоняется, и Angular ругается на необработанный reject.

Два правила, без которых окно не откроется:

- шаблон листа **обязан** начинаться с `<md-bottom-sheet>`, иначе Material не
  найдёт обёртку и лист не отрисуется;
- `parent` в опциях не передаём — это «куда прикрепить окно», по умолчанию
  корень приложения.

---

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

4. Подключить контроллер в `app/index.html` и кнопку перехода в общий хедер:

```html
<button class="button2" ng-click="openPage('<name>')">Заголовок</button>
```

---

## Проверка без браузера

```bash
sh check-di.sh
```

Скрипт разбирает все `app.service/factory/controller`, собирает зависимости и
сверяет их с зарегистрированными провайдерами.

Ловит ошибку вида `Unknown provider: dialog`, когда фабрика потерялась при
правке файла. Вывод `DI-граф целостный` — всё разрешается.
