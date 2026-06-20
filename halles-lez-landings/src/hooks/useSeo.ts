import { useEffect } from 'react';
import { applySeo, type SeoConfig } from '../utils/seo';

export function useSeo(config: SeoConfig) {
  useEffect(() => {
    applySeo(config);
  }, [config]);
}