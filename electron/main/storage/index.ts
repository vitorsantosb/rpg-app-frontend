import {
  GetStorageFilePath,
  SaveStorageValue,
  LoadStorageValue,
  RemoveStorageValue,
  ClearStorage
} from "./securityStorage";
import { app } from "electron";

export class StorageSystem {
  private filePath: string;

  constructor(base: Parameters<typeof app.getPath>[0] | string, file = 'storage.json') {
    this.filePath = GetStorageFilePath(base, file);
  }

  set(key: string, value: string) {
    SaveStorageValue(this.filePath, key, value);
  }

  get(key: string) {
    return LoadStorageValue(this.filePath, key);
  }

  remove(key: string) {
    RemoveStorageValue(this.filePath, key);
  }

  clear() {
    ClearStorage(this.filePath);
  }

  get path() {
    return this.filePath;
  }
}

