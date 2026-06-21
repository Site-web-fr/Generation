import { isMobileDevice } from './device';

type ProgressCallback = (percent: number) => void;

async function loadWithRetry<T>(loader: () => Promise<T>, retries = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      return await loader();
    } catch (error) {
      lastError = error;
      if (attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

/** Preload heavy premium chunks on mobile while the cinematic loader runs. */
export async function preloadPremiumExperience(onProgress?: ProgressCallback): Promise<void> {
  if (!isMobileDevice()) {
    onProgress?.(100);
    return;
  }

  const steps = [
    () => loadWithRetry(() => import('../components/scenes/Scene3D')),
  ];

  for (let i = 0; i < steps.length; i += 1) {
    await steps[i]();
    onProgress?.(Math.round(((i + 1) / steps.length) * 100));
  }
}
