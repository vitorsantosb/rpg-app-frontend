"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
const electronAPI = {
  setStorage: (key, value) => electron.ipcRenderer.invoke("storage:set", key, value),
  getStorage: (key) => electron.ipcRenderer.invoke("storage:get", key),
  removeStorage: (key) => electron.ipcRenderer.invoke("storage:remove", key),
  clearStorage: () => electron.ipcRenderer.invoke("storage:clear"),
  onMessage: (callback) => electron.ipcRenderer.on("main-process-message", callback)
};
electron.contextBridge.exposeInMainWorld("electronAPI", electronAPI);
