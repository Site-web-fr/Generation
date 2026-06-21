import { useMemo, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import Reveal from '../components/Reveal'
import { OptionGroup, PriceReadout, RangeField } from '../components/configurator'
import { Quote, SectionHeader, Stats, Steps } from '../components/sections'
import { eur, num } from '../lib/format'
import { useHasFinePointer } from '../lib/hooks'
import { BRAND_MAP } from '../theme/brands'
import MonolithScene from '../three/MonolithScene'
import SceneCanvas from '../three/SceneCanvas'
import './landing.css'
import './realestate.css'

const brand = BRAND_MAP.realestate

const LOCATIONS = [
  { id: 'paris', label: 'Paris', sub: '8ᵉ · 16ᵉ', perM2: 22000 },
  { id: 'riviera', label: 'Côte d’Azur', sub: 'Cap-Ferrat', perM2: 28000 },
  { id: 'geneve', label: 'Genève', sub: 'Rive gauche', perM2: 24000 },
] as const

const STANDING = [
  { id: 'prestige', label: 'Prestige', sub: '×1.0' },
  { id: 'exception', label: 'Exception', sub: '×1.35' },
  { id: 'signature', label: 'Signature', sub: '×1.8' },
] as const

const STANDING_MULT: Record<string, number> = {
  prestige: 1,
  exception: 1.35,
  signature: 1.8,
}

const PROPERTIES = [
  { name: 'Villa Hélios', loc: 'Cap-Ferrat', meta: '420 m² · 6 ch · mer', price: 18500000, lifestyle: 'mer', grad: 'linear-gradient(140deg,#1d3a4a,#6fb6c8)' },
  { name: 'Hôtel particulier Faubourg', loc: 'Paris 7ᵉ', meta: '610 m² · jardin', price: 24900000, lifestyle: 'ville', grad: 'linear-gradient(140deg,#2a2230,#c8a26a)' },
  { name: 'Chalet Altitude', loc: 'Megève', meta: '480 m² · 5 ch · ski', price: 12700000, lifestyle: 'montagne', grad: 'linear-gradient(140deg,#27313d,#cfd6e0)' },
  { name: 'Domaine des Oliviers', loc: 'Saint-Rémy', meta: '8 ha · 7 ch', price: 9800000, lifestyle: 'campagne', grad: 'linear-gradient(140deg,#2d3a2a,#a6cf8a)' },
  { name: 'Penthouse Skyline', loc: 'Monaco', meta: '300 m² · rooftop', price: 31500000, lifestyle: 'ville', grad: 'linear-gradient(140deg,#241f2c,#9a7bd0)' },
  { name: 'Mas Lavande', loc: 'Gordes', meta: '12 ha · piscine', price: 7600000, lifestyle: 'campagne', grad: 'linear-gradient(140deg,#3a3320,#d6c08a)' },
] as const

const LIFESTYLES = [
  { id: 'all', label: 'Tout' },
  { id: 'mer', label: 'Bord de mer' },
  { id: 'montagne', label: 'Montagne' },
  { id: 'ville', label: 'Ville' },
  { id: 'campagne', label: 'Campagne' },
] as const

function TiltCard({
  p,
}: {
  p: (typeof PROPERTIES)[number]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useHasFinePointer()
  function onMove(e: React.MouseEvent) {
    if (!fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-6px)`
  }
  function reset() {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <div
      ref={ref}
      className="property"
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor="hover"
      data-cursor-label="Visiter"
    >
      <div className="property__visual" style={{ background: p.grad }}>
        <span className="property__price">{eur.format(p.price)}</span>
      </div>
      <div className="property__body">
        <h3 className="property__name">{p.name}</h3>
        <span className="property__meta muted">{p.loc} · {p.meta}</span>
      </div>
    </div>
  )
}

function Estimator() {
  const [surface, setSurface] = useState(280)
  const [locId, setLocId] = useState<(typeof LOCATIONS)[number]['id']>('paris')
  const [standing, setStanding] = useState<(typeof STANDING)[number]['id']>('exception')

  const { low, high } = useMemo(() => {
    const loc = LOCATIONS.find((l) => l.id === locId)!
    const base = surface * loc.perM2 * STANDING_MULT[standing]
    return { low: Math.round(base * 0.9), high: Math.round(base * 1.12) }
  }, [surface, locId, standing])

  return (
    <div className="config">
      <div className="config__visual">
        <SceneCanvas camera={{ position: [0, 0, 8], fov: 40 }}>
          <MonolithScene color={brand.accent} />
        </SceneCanvas>
        <span className="config__hint">Estimation privée · indicative</span>
      </div>
      <div className="config__panel card">
        <RangeField
          label="Surface habitable"
          min={80}
          max={900}
          step={10}
          value={surface}
          onChange={setSurface}
          format={(v) => `${num.format(v)} m²`}
        />
        <OptionGroup label="Localisation" options={LOCATIONS} value={locId} onChange={setLocId} />
        <OptionGroup label="Standing" options={STANDING} value={standing} onChange={setStanding} />
        <PriceReadout
          caption="Fourchette de valorisation estimée"
          amount={`${eur.format(low)} – ${eur.format(high)}`}
          note="Estimation algorithmique indicative. Une évaluation confidentielle est réalisée par un conseiller dédié."
        >
          <Magnetic strength={0.35}>
            <a className="btn btn--solid" href="#contact" data-cursor="hover" data-cursor-label="Estimer">
              <span className="btn__dot" />
              Demander une estimation privée
            </a>
          </Magnetic>
        </PriceReadout>
      </div>
    </div>
  )
}

export default function RealEstate() {
  const [filter, setFilter] = useState<(typeof LIFESTYLES)[number]['id']>('all')
  const visible = PROPERTIES.filter((p) => filter === 'all' || p.lifestyle === filter)

  return (
    <div style={{ ['--accent' as string]: brand.accent }}>
      <Hero
        brand={brand}
        scene={
          <SceneCanvas camera={{ position: [0, 0, 9], fov: 42 }}>
            <MonolithScene color={brand.accent} />
          </SceneCanvas>
        }
        ctaLabel="Découvrir les biens"
        ctaHref="#collection"
        secondaryLabel="Estimer un bien"
        secondaryHref="#estimation"
      />

      <Marquee
        items={['Hôtels particuliers', 'Villas signature', 'Penthouses', 'Domaines', 'Chalets', 'Off-market']}
        reverse
      />

      <section className="section wrap" id="collection">
        <div className="cfg-section__head">
          <SectionHeader
            eyebrow="La collection"
            title={<>Des adresses <em>off-market</em></>}
          />
          <div className="re-filter">
            {LIFESTYLES.map((l) => (
              <button
                key={l.id}
                className={`re-filter__btn ${filter === l.id ? 'is-active' : ''}`}
                onClick={() => setFilter(l.id)}
                data-cursor="hover"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div className="gallery">
          {visible.map((p) => (
            <Reveal key={p.name}>
              <TiltCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap" id="estimation">
        <SectionHeader
          eyebrow="Estimation privée"
          title="Quelle est la valeur de votre bien ?"
          intro="Un premier ordre de grandeur, instantané et confidentiel. Nos conseillers affinent ensuite avec une évaluation sur place."
        />
        <Estimator />
      </section>

      <section className="section band">
        <div className="wrap">
          <SectionHeader eyebrow="Notre méthode" title="L’art de la transaction confidentielle" />
          <Steps
            items={[
              { title: 'Découverte', body: 'Nous écoutons votre projet de vie avant de parler de mètres carrés. Vos critères, vos non-négociables.' },
              { title: 'Curation', body: 'Une sélection resserrée de biens, dont des opportunités off-market jamais diffusées publiquement.' },
              { title: 'Visites privées', body: 'Des visites orchestrées, en toute discrétion, accompagnées d’un conseiller unique.' },
              { title: 'Acquisition', body: 'Négociation, juridique, financement : nous sécurisons chaque étape jusqu’à la remise des clés.' },
            ]}
          />
        </div>
      </section>

      <section className="section wrap">
        <Stats
          items={[
            { value: 2400, suffix: ' M€', label: 'Transactions accompagnées' },
            { value: 38, label: 'Pays · clientèle' },
            { value: 70, suffix: '%', label: 'Biens off-market' },
            { value: 1, label: 'Conseiller dédié' },
          ]}
        />
      </section>

      <section className="section wrap">
        <Quote
          quote="Ils ont trouvé la maison avant même que je sache la décrire. Une discrétion totale."
          author="Famille V."
          role="Acquéreurs · Cap-Ferrat"
        />
      </section>

      <div id="contact" />
      <Footer brand={brand} ctaTitle={<>Trouvons votre <em>adresse rare</em>.</>} phone="+33 4 93 00 00 00" />
    </div>
  )
}
