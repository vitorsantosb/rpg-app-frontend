export {};

declare global {
  interface Window {
    electronAPI: {
      setStorage: (key: string, value: string) => Promise<void>;
      getStorage: (key: string) => Promise<string | null>;
      removeStorage: (key: string) => Promise<void>;
      clearStorage: () => Promise<void>;
      onMessage: (callback: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void) => void;
    };
  }
}
