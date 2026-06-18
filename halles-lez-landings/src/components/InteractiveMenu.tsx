import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Brand, MenuItem } from '../data/brands';

interface Props {
  brand: Brand;
}

const ALL_FILTER = 'Tous';

export default function InteractiveMenu({ brand }: Props) {
  const reduceMotion = useReducedMotion();
  const badges = useMemo(
    () => [...new Set(brand.menu.map((item) => item.badge).filter(Boolean))] as string[],
    [brand.menu],
  );
  const [filter, setFilter] = useState(ALL_FILTER);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = useMemo(
    () =>
      filter === ALL_FILTER ? brand.menu : brand.menu.filter((item) => item.badge === filter),
    [brand.menu, filter],
  );

  const safeIndex = Math.min(selectedIndex, Math.max(filtered.length - 1, 0));
  const selected = filtered[safeIndex] ?? filtered[0];

  function selectFilter(next: string) {
    setFilter(next);
    setSelectedIndex(0);
  }

  function selectItem(index: number) {
    setSelectedIndex(index);
  }

  return (
    <div className="interactive-menu">
      {badges.length > 0 && (
        <div className="menu-filters" role="tablist" aria-label="Filtrer la carte">
          <FilterChip active={filter === ALL_FILTER} onClick={() => selectFilter(ALL_FILTER)}>
            Tous
          </FilterChip>
          {badges.map((badge) => (
            <FilterChip key={badge} active={filter === badge} onClick={() => selectFilter(badge)}>
              {badge}
            </FilterChip>
          ))}
        </div>
      )}

      <div className="menu-interactive-layout">
        <div className="menu-picker" role="tablist" aria-label="Plats du menu">
          {filtered.map((item, index) => (
            <MenuPickerItem
              key={`${item.name}-${index}`}
              item={item}
              index={index}
              total={filtered.length}
              active={index === safeIndex}
              onSelect={() => selectItem(index)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <MenuDetail
              key={`${selected.name}-${safeIndex}`}
              item={selected}
              index={safeIndex}
              total={filtered.length}
              brand={brand}
              reduceMotion={!!reduceMotion}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={`menu-filter-chip${active ? ' is-active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function MenuPickerItem({
  item,
  index,
  total,
  active,
  onSelect,
}: {
  item: MenuItem;
  index: number;
  total: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`menu-tab-${index}`}
      aria-selected={active}
      aria-controls="menu-detail-panel"
      className={`menu-picker-item${active ? ' is-active' : ''}`}
      onClick={onSelect}
    >
      <span className="menu-picker-emoji" aria-hidden="true">
        {item.emoji}
      </span>
      <span className="menu-picker-copy">
        <span className="menu-picker-name">{item.name}</span>
        <span className="menu-picker-meta">
          {item.badge && <span className="menu-picker-badge">{item.badge}</span>}
          <span className="menu-picker-price">{item.price}</span>
        </span>
      </span>
      <span className="menu-picker-index" aria-hidden="true">
        {index + 1}/{total}
      </span>
    </button>
  );
}

function MenuDetail({
  item,
  index,
  total,
  brand,
  reduceMotion,
}: {
  item: MenuItem;
  index: number;
  total: number;
  brand: Brand;
  reduceMotion: boolean;
}) {
  const orderHref = brand.uberEats ?? brand.googleMaps;
  const orderLabel = brand.uberEats ? 'Commander ce plat' : 'Venir au stand';

  return (
    <motion.article
      id="menu-detail-panel"
      role="tabpanel"
      aria-labelledby={`menu-tab-${index}`}
      className="menu-detail"
      initial={reduceMotion ? false : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="menu-detail-visual" aria-hidden="true">
        <span className="menu-detail-emoji">{item.emoji}</span>
        <span className="menu-detail-ring" />
      </div>

      <div className="menu-detail-body">
        <div className="menu-detail-header">
          {item.badge && <span className="menu-detail-badge">{item.badge}</span>}
          <span className="menu-detail-counter">
            {index + 1} / {total}
          </span>
        </div>

        <h3>{item.name}</h3>
        <p className="menu-detail-desc">{item.description}</p>

        <div className="menu-detail-footer">
          <span className="menu-detail-price">{item.price}</span>
          <a
            href={orderHref}
            target={brand.uberEats ? '_blank' : undefined}
            rel={brand.uberEats ? 'noopener noreferrer' : undefined}
            className="menu-detail-cta"
          >
            {orderLabel} →
          </a>
        </div>
      </div>
    </motion.article>
  );
}
