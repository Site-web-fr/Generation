import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

type ModuleDefault<T> = { default: T };

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function importWithRetry<T>(
  loader: () => Promise<ModuleDefault<T>>,
  retries = 3,
): Promise<ModuleDefault<T>> {
  let lastError: unknown;
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      return await loader();
    } catch (error) {
      lastError = error;
      if (attempt < retries - 1) {
        await wait(800 * (attempt + 1));
      }
    }
  }
  throw lastError;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
  loader: () => Promise<ModuleDefault<T>>,
): LazyExoticComponent<T> {
  return lazy(() => importWithRetry(loader));
}
