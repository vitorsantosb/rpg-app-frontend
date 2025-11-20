import { ipcRenderer, contextBridge } from 'electron'
import {ElectronAPI} from './main/interface/electronApi.ts';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
});


const electronAPI: ElectronAPI = {
  setStorage: (key, value) => ipcRenderer.invoke('storage:set', key, value),
  getStorage: (key) => ipcRenderer.invoke('storage:get', key),
  removeStorage: (key) => ipcRenderer.invoke('storage:remove', key),
  clearStorage: () => ipcRenderer.invoke('storage:clear'),
  onMessage: (callback) => ipcRenderer.on('main-process-message', callback),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

