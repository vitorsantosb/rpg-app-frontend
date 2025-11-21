import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { StorageSystem } from './main/storage';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, '..');
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  // Método 1: Usando before-input-event (para eventos dentro da janela)
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') {
      event.preventDefault();
      toggleDevTools();
    }
  });

  // Método 2: Usando globalShortcut (mais confiável)
  app.whenReady().then(() => {
    // Registra F12 como atalho global
    globalShortcut.register('F12', () => {
      toggleDevTools();
    });

    // Também registra Ctrl+Shift+I / Cmd+Option+I
    globalShortcut.register('CommandOrControl+Shift+I', () => {
      toggleDevTools();
    });
  });

  // Função auxiliar para abrir/fechar DevTools
  function toggleDevTools() {
    if (win) {
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools();
      } else {
        win.webContents.openDevTools();
      }
    }
  }

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// Lifecycle
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Limpa os atalhos globais quando o app fecha
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.whenReady().then(createWindow);

// ---------- IPC Handlers ----------
const storage = new StorageSystem('userData');

ipcMain.handle('storage:set', (_event, key: string, value: string) => {
  storage.set(key, value);
});

ipcMain.handle('storage:get', (_event, key: string) => {
  return storage.get(key);
});

ipcMain.handle('storage:remove', (_event, key: string) => {
  storage.remove(key);
});

ipcMain.handle('storage:clear', () => {
  storage.clear();
});
