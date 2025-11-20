import { app, safeStorage } from "electron";
import fs from "fs";
import path from "path";

export function GetStorageFilePath(
  baseDir: Parameters<typeof app.getPath>[0] | string,
  storageFile: string
): string {
  const dirPath = app.getPath(baseDir as any) ?? baseDir;
  return path.join(dirPath, storageFile);
}

export function ReadStorageFile(filePath: string): Record<string, string> {
  try {
    if (!fs.existsSync(filePath)) return {};
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function WriteStorageFile(filePath: string, data: Record<string, string>): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function SaveStorageValue(filePath: string, key: string, value: string): void {
  const storage = ReadStorageFile(filePath);

  storage[key] = safeStorage.isEncryptionAvailable()
    ? safeStorage.encryptString(value).toString("base64")
    : value;

  WriteStorageFile(filePath, storage);
}

export function LoadStorageValue(filePath: string, key: string): string | null {
  const storage = ReadStorageFile(filePath);
  const value = storage[key];
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

export function RemoveStorageValue(filePath: string, key: string): void {
  const storage = ReadStorageFile(filePath);
  delete storage[key];
  WriteStorageFile(filePath, storage);
}

export function ClearStorage(filePath: string): void {
  WriteStorageFile(filePath, {});
}
