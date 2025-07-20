// import fs from "fs";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

// Write relevant env variables to a file for debugging
// fs.writeFileSync(
//   "env-debug.json",
//   JSON.stringify(
//     {
//       REACT_APP_REMOTE_HOMEAPP_URL: process.env.REACT_APP_REMOTE_HOMEAPP_URL,
//       REACT_APP_REMOTE_PRODUCTS_URL: process.env.REACT_APP_REMOTE_PRODUCTS_URL,
//       NODE_ENV: process.env.NODE_ENV,
//     },
//     null,
//     2
//   )
// );

console.log(
  "[DEBUG 11111] Environment variables for Module Federation...",
  process.env
);

export default {
  webpack: {
    configure: async (config) => {
      console.log(
        "[DEBUG 22222] Environment variables for Module Federation...",
        process.env
      );
      // Динамический импорт ModuleFederationPlugin
      const { ModuleFederationPlugin } = await import(
        "webpack/lib/container/ModuleFederationPlugin.js"
      );

      // Настройка publicPath
      config.output = {
        ...config.output,
        publicPath: "auto",
      };

      // Добавляем ModuleFederationPlugin
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "shell", // Имя текущего приложения (Shell)
          remotes: {
            homeApp: `homeApp@${process.env.REMOTE_HOMEAPP_URL}`,
            products: `products@${process.env.REMOTE_PRODUCTS_URL}`,
          },
          shared: {
            vue: {
              singleton: true, // Указываем, что Vue должна быть общей
              eager: true, // Загружается немедленно
              requiredVersion: "^3.5.17", // Используем установленную версию Vue
            },
          },
        })
      );

      return config;
    },
  },
};
