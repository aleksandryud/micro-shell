import React, { lazy, Suspense, FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { applyVueInReact } from "veaury";

// Динамическая загрузка HomeApp с приведением типов
const HomeAppLazy = lazy(async () => {
  const container = (window as any).homeApp;
  if (!container) {
    throw new Error("HomeApp remote не найден. Проверьте remoteEntry.js.");
  }
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get("./HomeApp");
  const HomeApp = factory().default || factory();

  // Явно указываем, что HomeApp — это React-компонент
  return { default: applyVueInReact(HomeApp) as React.ComponentType<any> };
});

// Динамическая загрузка ProductsApp с приведением типов
const ProductsAppLazy = lazy(async () => {
  const container = (window as any).products;
  if (!container) {
    throw new Error("ProductsApp remote не найден. Проверьте remoteEntry.js.");
  }
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get("./ProductsApp");
  const ProductsApp = factory().default || factory();

  // Явно указываем, что ProductsApp — это React-компонент
  return { default: ProductsApp as React.ComponentType<any> };
});

// Основной компонент приложения
const App: FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<h1>Главная страница Shell</h1>} />
          <Route path="/home" element={<HomeAppLazy />} />
          <Route path="/products" element={<ProductsAppLazy />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
