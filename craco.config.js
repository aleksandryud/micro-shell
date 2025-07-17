export default {
  webpack: {
    configure: async (config) => {
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
            homeApp: `homeApp@${
              process.env.REMOTE_HOMEAPP_URL ||
              "http://localhost:4173/remoteEntry.js"
            }`,
            products: `products@${
              process.env.REMOTE_PRODUCTS_URL ||
              "http://localhost:3005/remoteEntry.js"
            }`,
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
