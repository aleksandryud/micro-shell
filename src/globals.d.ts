declare global {
  interface Window {
    homeApp?: {
      get: (module: string) => Promise<{ default: React.ComponentType<any> }>;
      init: (shareScope: unknown) => Promise<void>;
    };
    products?: {
      get: (module: string) => Promise<{ default: React.ComponentType<any> }>;
      init: (shareScope: unknown) => Promise<void>;
    };
  }
}

// Обязательно для работы Webpack runtime
declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Record<string, unknown> };
