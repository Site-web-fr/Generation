import type { ArtDirection } from '../../data/site-art-direction';

interface Props {
  art: ArtDirection;
  slug: string;
}

export default function ArtDirectionDecor({ art, slug }: Props) {
  return (
    <div className={`da-decor da-decor--${art.decor} da-decor--${slug}`} aria-hidden>
      {art.decor === 'racing-stripe' && <div className="da-racing-stripe" />}
      {art.decor === 'neon-slash' && (
        <>
          <div className="da-neon-slash da-neon-slash--1" />
          <div className="da-neon-slash da-neon-slash--2" />
        </>
      )}
      {art.decor === 'thin-rules' && (
        <>
          <div className="da-rule da-rule--h" />
          <div className="da-rule da-rule--v" />
        </>
      )}
      {art.decor === 'deco-corners' && (
        <>
          <span className="da-deco-corner da-deco-corner--tl" />
          <span className="da-deco-corner da-deco-corner--br" />
        </>
      )}
      {art.decor === 'spotlight' && <div className="da-spotlight" />}
      {art.decor === 'hud' && (
        <div className="da-hud">
          <span>ALT 41,000</span>
          <span>MACH 0.87</span>
        </div>
      )}
      {art.decor === 'wave' && <div className="da-wave" />}
      {art.decor === 'rose-grid' && <div className="da-rose-grid" />}
      {art.decor === 'stone-blocks' && <div className="da-stone-blocks" />}
      {art.decor === 'rope-lines' && <div className="da-rope-lines" />}
    </div>
  );
}
