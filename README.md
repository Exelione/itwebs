Тестовое приложение на Next.js (Pages Router)
Демонстрационное приложение, показывающее различные стратегии рендеринга в Next.js: SSR, SSG, CSR и ISR.

🚀 Демо-фичи
- SSR: Главная страница с загрузкой котов и Redux-гидратацией

- SSG: Статическая страница "О нас"

- CSR: Избранные коты на клиенте

- ISR: Страница загрузки с регенерацией

- POST: Отправка формы из модалки (text + file)

- WebSocket: Отправка уведомления после успешного POST
  
📁 Структура проекта

src/
  app/
    providers/           # Провайдеры (Redux, Theme)
    store/               # Redux store
    styles/              # SCSS (reset, темы)
  entities/
    cat/                 # Модель, типы и UI котов
  features/
    realtime-communication/  # WebSocket (hook, service, types)
    upload-manager/          # История загрузок (hook)
  pages/
    _app.tsx
    index.tsx            # SSR
    about/               # SSG
    favorites/           # CSR
    upload/              # ISR
  shared/
    api/                 # catApi (POST)
    lib/                 # classNames, hooks
    ui/                  # Button, AppLink
  widgets/
    Navbar/
    ThemeSwitcher/
    AddCatModal/

🔌 API и WebSocket

- GET котов: TheCatAPI
https://api.thecatapi.com/v1/images/search?limit=10
Используется в fetchCats (src/entities/cat/model/catSlice.ts)
- POST добавления кота (демо): jsonplaceholder
https://jsonplaceholder.typicode.com/posts
Отправляется JSON { title: <name> } в src/shared/api/catApi.ts
Для файла используется URL.createObjectURL только для локального предпросмотра
- WebSocket демо:
Подключение к wss://ws.postman-echo.com/raw
Хук: src/features/realtime-communication/lib/hooks/useWebsocket.ts
Сообщение отправляется из страницы upload после успешного POST
Генерация сообщений: src/features/realtime-communication/lib/utils/messageFactory.ts

Скрипты
npm run dev — запуск дев-сервера
npm run build — прод-сборка
npm run start — запуск прод-сервера
npm run lint — линтинг
