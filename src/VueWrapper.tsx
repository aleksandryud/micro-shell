import React, { useRef, useEffect } from "react";
import { createApp, App as VueApp } from "vue";

interface VueWrapperProps {
  component: VueApp; // Vue-компонент для отображения
  props?: Record<string, any>; // Пропсы, передаваемые в Vue
}

const VueWrapper: React.FC<VueWrapperProps> = ({ component, props }) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elRef.current) {
      const app = createApp(component, props); // Создаём Vue приложение
      app.mount(elRef.current); // Монтируем Vue в React DOM

      return () => {
        app.unmount(); // Размонтируем Vue при удалении React-компонента
      };
    }
  }, [component, props]);

  return <div ref={elRef} />;
};

export default VueWrapper;
