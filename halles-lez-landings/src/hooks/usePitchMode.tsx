import { useContext } from 'react';
import { PitchModeContext } from './pitch-mode-context';

export function usePitchMode(): boolean {
  return useContext(PitchModeContext);
}
