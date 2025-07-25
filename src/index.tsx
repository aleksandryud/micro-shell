import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { loadRemoteEntry } from "./utils/remoteLoader"; // Импортируем наш загрузчик remoteEntry.js

(async () => {
  try {
    console.log(
      "Инициализация приложения Shell... REACT_APP_REMOTE_PRODUCTS_URL",
      process.env.REACT_APP_REMOTE_PRODUCTS_URL
    );

    await loadRemoteEntry(process.env.REACT_APP_REMOTE_PRODUCTS_URL!);
    console.log("Products remoteEntry.js загружен успешно.");

    // Явная инициализация shared scope
    await __webpack_init_sharing__("default");
    console.log("Shared зависимости успешно инициализированы.");

    // Логируем текущее состояние shared зависимостей
    console.log("Состояние __webpack_share_scopes__:");
    console.log((window as any).__webpack_share_scopes__);
    console.log(__webpack_share_scopes__);
  } catch (error) {
    console.error(
      "Ошибка загрузки remoteEntry.js или shared зависимостей:",
      error
    );
    return;
  }

  // Запуск React приложения
  const root = ReactDOM.createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
