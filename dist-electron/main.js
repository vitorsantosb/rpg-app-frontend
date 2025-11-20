import { app, safeStorage, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path$1 from "node:path";
import fs from "fs";
import path from "path";
function GetStorageFilePath(baseDir, storageFile) {
  const dirPath = app.getPath(baseDir) ?? baseDir;
  return path.join(dirPath, storageFile);
}
function ReadStorageFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return {};
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}
function WriteStorageFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
function SaveStorageValue(filePath, key, value) {
  const storage2 = ReadStorageFile(filePath);
  storage2[key] = safeStorage.isEncryptionAvailable() ? safeStorage.encryptString(value).toString("base64") : value;
  WriteStorageFile(filePath, storage2);
}
function LoadStorageValue(filePath, key) {
  const storage2 = ReadStorageFile(filePath);
  const value = storage2[key];
  if (!value) return null;
  if (safeStorage.isEncryptionAvailable()) {
    try {
      const buffer = Buffer.from(value, "base64");
      return safeStorage.decryptString(buffer);
    } catch {
      return null;
    }
  }
  return value;
}
function RemoveStorageValue(filePath, key) {
  const storage2 = ReadStorageFile(filePath);
  delete storage2[key];
  WriteStorageFile(filePath, storage2);
}
function ClearStorage(filePath) {
  WriteStorageFile(filePath, {});
}
class StorageSystem {
  filePath;
  constructor(base, file = "storage.json") {
    this.filePath = GetStorageFilePath(base, file);
  }
  set(key, value) {
    SaveStorageValue(this.filePath, key, value);
  }
  get(key) {
    return LoadStorageValue(this.filePath, key);
  }
  remove(key) {
    RemoveStorageValue(this.filePath, key);
  }
  clear() {
    ClearStorage(this.filePath);
  }
  get path() {
    return this.filePath;
  }
}
const __dirname$1 = path$1.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path$1.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$1.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path$1.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path$1.join(__dirname$1, "preload.mjs")
    }
  });
  win.webContents.on("before-input-event", (_, input) => {
    if (input.key === "F12") {
      win?.webContents.openDevTools();
    }
  });
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$1.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.whenReady().then(createWindow);
const storage = new StorageSystem("userData");
ipcMain.handle("storage:set", (_event, key, value) => {
  storage.set(key, value);
});
ipcMain.handle("storage:get", (_event, key) => {
  return storage.get(key);
});
ipcMain.handle("storage:remove", (_event, key) => {
  storage.remove(key);
});
ipcMain.handle("storage:clear", () => {
  storage.clear();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
