import { useContext } from 'react';
import { PitchModeContext } from './pitchModeContext';

export function usePitchMode(): boolean {
  return useContext(PitchModeContext);
}
