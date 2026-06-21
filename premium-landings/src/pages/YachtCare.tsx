import { useMemo, useState } from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import Reveal from '../components/Reveal'
import { OptionGroup, PriceReadout, RangeField } from '../components/configurator'
import { Quote, SectionHeader, Stats, Steps } from '../components/sections'
import { eur, num } from '../lib/format'
import { BRAND_MAP } from '../theme/brands'
import { Yacht as YachtModel } from '../three/Craft'
import SceneCanvas from '../three/SceneCanvas'
import WaveScene from '../three/WaveScene'
import './landing.css'

const brand = BRAND_MAP.yacht

const PACKAGES = [
  { id: 'express', label: 'Express', sub: 'Entretien', perM: 110 },
  { id: 'signature', label: 'Signature', sub: 'Detailing complet', perM: 240 },
  { id: 'refit', label: 'Refit', sub: 'Restauration', perM: 480 },
] as const

const FREQ = [
  { id: 'once', label: 'Ponctuel', sub: '×1.0' },
  { id: 'monthly', label: 'Mensuel', sub: '-12%' },
  { id: 'season', label: 'Saison', sub: '-20%' },
] as const

const FREQ_MULT: Record<string, number> = { once: 1, monthly: 0.88, season: 0.8 }

const ADDONS = [
  { id: 'none', label: 'Aucune option', sub: '' },
  { id: 'teak', label: 'Rénovation teck', sub: '+ premium' },
  { id: 'ceramic', label: 'Protection céramique', sub: '+ premium' },
] as const

const ADDON_FEE: Record<string, number> = { none: 0, teak: 4200, ceramic: 6800 }

function YachtQuote() {
  const [length, setLength] = useState(28)
  const [pkgId, setPkgId] = useState<(typeof PACKAGES)[number]['id']>('signature')
  const [freq, setFreq] = useState<(typeof FREQ)[number]['id']>('season')
  const [addon, setAddon] = useState<(typeof ADDONS)[number]['id']>('ceramic')

  const total = useMemo(() => {
    const pkg = PACKAGES.find((p) => p.id === pkgId)!
    const base = length * pkg.perM * FREQ_MULT[freq]
    return Math.round(base + ADDON_FEE[addon])
  }, [length, pkgId, freq, addon])

  return (
    <div className="config">
      <div className="config__visual">
        <SceneCanvas camera={{ position: [0, 1.8, 8] }}>
          <WaveScene colorDeep="#0c3a33" colorCrest={brand.accent} amplitude={0.4} speed={0.7}>
            <YachtModel color={brand.accent2} />
          </WaveScene>
        </SceneCanvas>
        <span className="config__hint">Devis au mètre · indicatif</span>
      </div>
      <div className="config__panel card">
        <RangeField
          label="Longueur du yacht"
          min={10}
          max={90}
          value={length}
          onChange={setLength}
          format={(v) => `${num.format(v)} m`}
        />
        <OptionGroup label="Prestation" options={PACKAGES} value={pkgId} onChange={setPkgId} />
        <OptionGroup label="Fréquence" options={FREQ} value={freq} onChange={setFreq} />
        <OptionGroup label="Options premium" options={ADDONS} value={addon} onChange={setAddon} />
        <PriceReadout
          caption="Estimation par intervention"
          amount={eur.format(total)}
          note="Devis indicatif. Une visite technique à quai affine la prestation et le planning."
        >
          <Magnetic strength={0.35}>
            <a className="btn btn--solid" href="#contact" data-cursor="hover" data-cursor-label="Devis">
              <span className="btn__dot" />
              Planifier une intervention
            </a>
          </Magnetic>
        </PriceReadout>
      </div>
    </div>
  )
}

export default function YachtCare() {
  return (
    <div style={{ ['--accent' as string]: brand.accent }}>
      <Hero
        brand={brand}
        scene={
          <SceneCanvas camera={{ position: [0, 2, 8.5], fov: 46 }}>
            <WaveScene colorDeep="#0a332c" colorCrest={brand.accent} amplitude={0.45} speed={0.75}>
              <YachtModel color={brand.accent2} />
            </WaveScene>
          </SceneCanvas>
        }
        ctaLabel="Obtenir un devis"
        ctaHref="#devis"
        secondaryLabel="Nos prestations"
        secondaryHref="#prestations"
      />

      <Marquee
        items={['Carène', 'Teck', 'Gelcoat', 'Inox', 'Protection céramique', 'Brightwork']}
        reverse
      />

      <section className="section wrap" id="devis">
        <div className="cfg-section__head">
          <SectionHeader
            eyebrow="Devis interactif"
            title={<>Votre yacht, <em>au juste prix</em></>}
          />
          <p className="muted" style={{ maxWidth: '30ch' }}>
            Indiquez la longueur, la prestation et la fréquence : nous estimons
            votre intervention en direct, avant la visite technique.
          </p>
        </div>
        <YachtQuote />
      </section>

      <section className="section wrap" id="prestations">
        <SectionHeader
          eyebrow="Nos prestations"
          title="Trois niveaux d’excellence"
          intro="De l’entretien régulier à la restauration complète, une équipe dédiée et des produits marins haut de gamme — dans une discrétion absolue."
        />
        <div className="tiers">
          <Reveal className="tier card">
            <span className="eyebrow">Express</span>
            <span className="tier__name">Entretien régulier</span>
            <span className="tier__price">À partir de 110 €<small> / mètre</small></span>
            <ul className="tier__list">
              <li>Lavage carène &amp; superstructure</li>
              <li>Nettoyage inox &amp; vitrages</li>
              <li>Cockpit &amp; teck rincés</li>
              <li>Intervention à quai en 1 jour</li>
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="tier tier--featured card">
            <span className="eyebrow">Signature</span>
            <span className="tier__name">Detailing complet</span>
            <span className="tier__price">À partir de 240 €<small> / mètre</small></span>
            <ul className="tier__list">
              <li>Tout l’Express, en profondeur</li>
              <li>Polissage &amp; lustrage gelcoat</li>
              <li>Traitement teck nourrissant</li>
              <li>Intérieurs &amp; cuirs détaillés</li>
              <li>Coordinateur dédié</li>
            </ul>
          </Reveal>
          <Reveal delay={0.16} className="tier card">
            <span className="eyebrow">Refit</span>
            <span className="tier__name">Restauration</span>
            <span className="tier__price">Sur devis</span>
            <ul className="tier__list">
              <li>Rénovation complète du teck</li>
              <li>Protection céramique longue durée</li>
              <li>Reprise gelcoat &amp; peinture</li>
              <li>Suivi photographique détaillé</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <SectionHeader eyebrow="Notre intervention" title="Une mécanique de précision" />
          <Steps
            items={[
              { title: 'Devis interactif', body: 'Une première estimation en ligne, en quelques secondes, selon votre navire.' },
              { title: 'Visite technique', body: 'Un chef d’équipe inspecte le yacht à quai et affine la prestation.' },
              { title: 'Intervention', body: 'Une équipe dédiée intervient avec des produits marins haut de gamme.' },
              { title: 'Livraison & suivi', body: 'Yacht impeccable, rapport photographique, et planning d’entretien proposé.' },
            ]}
          />
        </div>
      </section>

      <section className="section wrap">
        <Stats
          items={[
            { value: 600, suffix: '+', label: 'Yachts entretenus' },
            { value: 3, label: 'Ports · Méditerranée' },
            { value: 100, suffix: '%', label: 'Produits marins premium' },
            { value: 24, suffix: ' h', label: 'Délai d’intervention' },
          ]}
        />
      </section>

      <section className="section wrap">
        <Quote
          quote="Mon yacht n’a jamais autant brillé. Une équipe invisible, un résultat éclatant."
          author="Capitaine D."
          role="M/Y 34 m · Monaco"
        />
      </section>

      <div id="contact" />
      <Footer brand={brand} ctaTitle={<>Redonnez de l’<em>éclat</em> à votre yacht.</>} phone="+377 99 00 00 00" />
    </div>
  )
}
