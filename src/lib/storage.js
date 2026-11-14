export function readStorage(key, fallback, storage) {
  try {
    const target = storage ?? globalThis.localStorage;
    const value = target.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch { return fallback; }
}

export function writeStorage(key, value, storage) {
  const target = storage ?? globalThis.localStorage;
  target.setItem(key, JSON.stringify(value));
  return true;
}
