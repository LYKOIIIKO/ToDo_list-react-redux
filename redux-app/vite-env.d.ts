/// <reference types="vite/client" />

// Здесь мы описываем типы для переменных окружения,
// которые будут доступны через import.meta.env
interface ImportMetaEnv {
  // Переменные Firebase, обычно их хранят в файле .env с префиксом VITE_
  // Vite требует, чтобы клиентские переменные окружения начинались с VITE_
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string; // Твой Project ID, например: todo-list-96880
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

// Определяем тип для объекта import.meta, чтобы он знал о наличии env
interface ImportMeta {
  readonly env: ImportMetaEnv;
}