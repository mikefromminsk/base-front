## Как запустить

1. Скачать и установить [Docker Desktop](https://www.docker.com/products/docker-desktop/),
   затем запустить его.
2. Перейти в папку проекта и выполнить:

```bash
cd base-front
docker compose up -d
```

3. Открыть страницу <http://localhost:8080>.

## Что внутри

```
base-front/
├── docker-compose.yaml
└── app/
    ├── app.js          настройки приложения
    ├── index.html      главная верстка
    ├── controller.js   главная контроллер
    ├── api/            папка для api
    ├── icon/           набор базовых иконок
    ├── utils/
    │   ├── js/         утилиты для JavaScript
    │   ├── css/        стили
    │   └── fonts/      шрифты
    └── views/          папки с экранами
```


## Как добавить страницу

1. Создать `app/views/<name>/index.html` и `app/views/<name>/controller.js`.
2. Добавить state в `app/app.js`:

```js
.state('<name>', {
    url: '/<name>',
    templateUrl: 'views/<name>/index.html',
    controller: '<name>',
})
```

3. Добавить кнопку:

```html
<button class="button2" ui-sref="<name>">Заголовок</button>
```



## Диалоги

Фабрики `dialog` и `sheet` из `app/utils/js/material.js`. Аргументы
одинаковые: контроллер, папка с шаблоном, данные, событие.

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

## GET и POST запросы

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

POST отличается только передачей параметров:

```js
api.post('api/data.json', {title: 'Новый пункт'}).then(function (result) {
    $scope.info = result.info
})
```



## Вёрстка

Классы — сокращения из набора утилит `app/utils/css/shorts.css` (по мотивам
Tailwind), цвета — из `colors.css`.

| Что                      | Классы                                                                              |
|--------------------------|-------------------------------------------------------------------------------------|
| Направление              | `.col` `.row`                                                                       |
| Растянуть по направлению | `.flex`                                                                             |
| Выравнивание             | `.a[s,c,e][s,c,e]` s=start c=center е=end                                           |
| Цвет фона                | `.back-[Цвет]` цвета=black,white,red,green,blue,accent,gray[50,100,200,300,400,500] |
| Цвет текста              | `.text-[Цвет]`                                                                      |
| Цвет границ              | `.border-[Цвет]`                                                                    |
| Отступы внутренний       | `.p[0,2,4,8,16,32]`                                                                 |
| Отступы внешний          | `.m[0,2,4,8,16,32]`                                                                 |
| Промежутки               | `.gap[0,2,4,8,16,32]`                                                               |
| Скругление углов         | `.r[0,2,4,8,16,32]`                                                                 |
| Стили текста             | `.regular` `.medium` `.bold` `.text-ac` `.text-fill`                                |
| Размеры картинок         | `.img[размер кратный 2 и 10]`                                                       |
| Цвет svg картинок        | `.img-[Цвет]`                                                                       |
| Позиционирование         | `.relative` `.absolute` `.top` `.bottom` `.left` `.right`                           |
| Прокрутка                | `.scroll` `.scroll-disabled` `.scroll-horizontal` `.scroll-vertical`                |
| Адаптивная верстка       | `.hide` `.show`  `.mob-show` `.mob-hide` `.mob-col` `.mob-col-reverse`              |
