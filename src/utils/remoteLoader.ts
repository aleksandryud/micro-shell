export const loadRemoteEntry = async (
  remoteEntryUrl: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = remoteEntryUrl; // URL для загрузки remoteEntry.js
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      console.log(`Remote entry ${remoteEntryUrl} загружен успешно.`);
      resolve();
    };

    script.onerror = (err) => {
      console.error(`Ошибка загрузки remote entry: ${remoteEntryUrl}`, err);
      reject(`Не удалось загрузить remote entry: ${remoteEntryUrl}`);
    };

    document.head.appendChild(script);
  });
};
