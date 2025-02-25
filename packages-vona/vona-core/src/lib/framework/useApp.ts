export function useApp() {
  return globalThis.__app__;
}

export async function closeApp() {
  if (globalThis.__app__) {
    await globalThis.__app__.meta.close();
    delete globalThis.__app__;
  }
}
