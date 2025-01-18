/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly DEV: boolean;
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 