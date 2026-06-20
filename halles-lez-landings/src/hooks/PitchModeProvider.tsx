import { useSyncExternalStore, type ReactNode } from 'react';
import { detectPitchMode } from '../utils/pitch-mode';
import { PitchModeContext } from './pitchModeContext';

function subscribe(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange);
  return () => window.removeEventListener('popstate', onStoreChange);
}

function getSnapshot() {
  return detectPitchMode();
}

export function PitchModeProvider({ children }: { children: ReactNode }) {
  const pitchMode = useSyncExternalStore(subscribe, getSnapshot, () => false);
  return <PitchModeContext.Provider value={pitchMode}>{children}</PitchModeContext.Provider>;
}
