import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';
import { detectPitchMode } from '../utils/pitch-mode';

const PitchModeContext = createContext(false);

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

export function usePitchMode(): boolean {
  return useContext(PitchModeContext);
}
