import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ENTRANCE_LABELS,
  PLAN_IMAGE,
  primaryEntrance,
  standPositionsForSlug,
  type StandCoord,
} from '../data/floor-plan';
import { assetUrl } from '../utils/url';
import './HallesFloorPlan.css';

interface Props {
  slug: string;
  brandName: string;
  standLabel: string;
  primaryColor: string;
}

function Marker({
  coord,
  brandName,
  primaryColor,
  showLabel,
}: {
  coord: StandCoord;
  brandName: string;
  primaryColor: string;
  showLabel: boolean;
}) {
  return (
    <div
      className="floor-plan-marker floor-plan-marker--active"
      style={
        {
          left: `${coord.x}%`,
          top: `${coord.y}%`,
          '--marker-color': primaryColor,
        } as React.CSSProperties
      }
    >
      <span className="floor-plan-marker-pulse" />
      <span className="floor-plan-marker-dot" />
      {showLabel && (
        <span className="floor-plan-marker-label">
          {brandName}
          <small>Stand {coord.id}</small>
        </span>
      )}
    </div>
  );
}

function PlanCanvas({
  slug,
  brandName,
  primaryColor,
  focused,
  className = '',
}: {
  slug: string;
  brandName: string;
  primaryColor: string;
  focused: boolean;
  className?: string;
}) {
  const positions = useMemo(() => standPositionsForSlug(slug), [slug]);
  const anchor = positions[0];

  const zoomStyle = useMemo(() => {
    if (!focused || !anchor) return undefined;
    return {
      '--plan-origin-x': `${anchor.x}%`,
      '--plan-origin-y': `${anchor.y}%`,
    } as React.CSSProperties;
  }, [focused, anchor]);

  if (!positions.length) return null;

  return (
    <div className={`floor-plan-canvas ${focused ? 'floor-plan-canvas--focused' : ''} ${className}`}>
      <div className="floor-plan-stage" style={zoomStyle}>
        <img
          src={assetUrl(PLAN_IMAGE)}
          alt="Plan axonométrique officiel des Halles du Lez"
          className="floor-plan-image"
          width={1587}
          height={964}
          draggable={false}
        />
        <div className="floor-plan-markers">
          {positions.map((coord, i) => (
            <Marker
              key={coord.id}
              coord={coord}
              brandName={brandName}
              primaryColor={primaryColor}
              showLabel={i === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HallesFloorPlan({ slug, brandName, standLabel, primaryColor }: Props) {
  const [focused, setFocused] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const entrance = primaryEntrance(slug);
  const positions = standPositionsForSlug(slug);

  const closeFullscreen = useCallback(() => setFullscreen(false), []);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [fullscreen, closeFullscreen]);

  if (!positions.length) return null;

  const standIds = positions.map((p) => p.id).join(' · ');

  return (
    <div className="floor-plan">
      <div className="floor-plan-toolbar">
        <button
          type="button"
          className={`floor-plan-toggle ${focused ? 'is-active' : ''}`}
          onClick={() => setFocused(true)}
        >
          Mon stand
        </button>
        <button
          type="button"
          className={`floor-plan-toggle ${!focused ? 'is-active' : ''}`}
          onClick={() => setFocused(false)}
        >
          Vue complète
        </button>
        <button
          type="button"
          className="floor-plan-expand"
          onClick={() => setFullscreen(true)}
          aria-label="Agrandir le plan"
        >
          ⤢
        </button>
      </div>

      <PlanCanvas
        slug={slug}
        brandName={brandName}
        primaryColor={primaryColor}
        focused={focused}
      />

      <div className="floor-plan-caption">
        <p className="floor-plan-stand">
          <strong>{standLabel}</strong>
          <span>Repère {standIds} sur le plan officiel</span>
        </p>
        {entrance && (
          <p className="floor-plan-entrance">
            Accès conseillé : <strong>{ENTRANCE_LABELS[entrance]}</strong>
          </p>
        )}
        <p className="floor-plan-credit">Plan officiel © Halles du Lez</p>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="floor-plan-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            <motion.div
              className="floor-plan-fullscreen-inner"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="floor-plan-close"
                onClick={closeFullscreen}
                aria-label="Fermer"
              >
                ✕
              </button>
              <PlanCanvas
                slug={slug}
                brandName={brandName}
                primaryColor={primaryColor}
                focused={focused}
                className="floor-plan-canvas--fullscreen"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
