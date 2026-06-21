import { useMemo, useState } from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import {
  OptionGroup,
  PriceReadout,
  RangeField,
  SwatchGroup,
} from '../components/configurator'
import { FeatureGrid, Quote, SectionHeader, Stats, Steps } from '../components/sections'
import { eur, num } from '../lib/format'
import { BRAND_MAP } from '../theme/brands'
import CarScene from '../three/CarScene'
import SceneCanvas from '../three/SceneCanvas'
import './landing.css'

const brand = BRAND_MAP.vehicle

const MODELS = [
  { id: 'gt', label: 'Gran Turismo', sub: 'V8 · 612 ch', dayRate: 1290, includedKm: 150, kmRate: 4.5 },
  { id: 'super', label: 'Supercar', sub: 'V12 · 819 ch', dayRate: 2490, includedKm: 120, kmRate: 7 },
  { id: 'suv', label: 'SUV Signature', sub: 'V8 · 550 ch', dayRate: 990, includedKm: 200, kmRate: 3.5 },
] as const

const PAINTS = [
  { id: 'rosso', label: 'Rosso Atelier', hex: '#d8553f' },
  { id: 'noir', label: 'Noir Profond', hex: '#15171c' },
  { id: 'argent', label: 'Argent Liquide', hex: '#c7ccd2' },
  { id: 'bleu', label: 'Bleu Riviera', hex: '#2f5fa8' },
  { id: 'vert', label: 'Vert British', hex: '#1f4d3a' },
  { id: 'champagne', label: 'Champagne', hex: '#c9b48a' },
]

const FINISHES = [
  { id: 'gloss', label: 'Vernis brillant', sub: 'Inclus' },
  { id: 'matte', label: 'Finition mate', sub: '+15%' },
] as const

function VehicleConfigurator() {
  const [modelId, setModelId] = useState<(typeof MODELS)[number]['id']>('gt')
  const [paintId, setPaintId] = useState(PAINTS[0].id)
  const [finish, setFinish] = useState<(typeof FINISHES)[number]['id']>('gloss')
  const [days, setDays] = useState(3)
  const [totalKm, setTotalKm] = useState(450)

  const model = MODELS.find((m) => m.id === modelId)!
  const paint = PAINTS.find((p) => p.id === paintId)!

  const { total, extraKm, perDay } = useMemo(() => {
    const includedTotal = model.includedKm * days
    const extra = Math.max(0, totalKm - includedTotal)
    const base = model.dayRate * days + extra * model.kmRate
    const finishMult = finish === 'matte' ? 1.15 : 1
    const t = Math.round(base * finishMult)
    return { total: t, extraKm: extra, perDay: Math.round(t / days) }
  }, [model, days, totalKm, finish])

  return (
    <div className="config">
      <div className="config__visual">
        <SceneCanvas camera={{ position: [4.5, 1.6, 5.5], fov: 38 }} interactive>
          <CarScene
            color={paint.hex}
            finishRoughness={finish === 'matte' ? 0.62 : 0.16}
            autoRotate
          />
        </SceneCanvas>
        <span className="config__hint">Glissez pour faire pivoter · {paint.label}</span>
      </div>

      <div className="config__panel card">
        <OptionGroup
          label="Modèle"
          options={MODELS.map((m) => ({ id: m.id, label: m.label, sub: m.sub }))}
          value={modelId}
          onChange={setModelId}
        />
        <SwatchGroup label="Teinte" swatches={PAINTS} value={paintId} onChange={setPaintId} />
        <OptionGroup label="Finition" options={FINISHES} value={finish} onChange={setFinish} />
        <RangeField
          label="Durée"
          min={1}
          max={30}
          value={days}
          onChange={setDays}
          format={(v) => `${v} ${v > 1 ? 'jours' : 'jour'}`}
        />
        <RangeField
          label="Kilométrage prévu"
          min={50}
          max={3000}
          step={50}
          value={totalKm}
          onChange={setTotalKm}
          format={(v) => `${num.format(v)} km`}
        />

        <PriceReadout
          caption="Estimation tout compris"
          amount={eur.format(total)}
          note={`${eur.format(perDay)} / jour · ${num.format(model.includedKm * days)} km inclus${
            extraKm > 0 ? ` · ${num.format(extraKm)} km sup. facturés` : ''
          }`}
        >
          <Magnetic strength={0.35}>
            <a
              className="btn btn--solid"
              href="#reserver"
              data-cursor="hover"
              data-cursor-label="Réserver"
            >
              <span className="btn__dot" />
              Réserver en ligne
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a className="btn btn--ghost" href="tel:+33186760000" data-cursor="hover">
              Ou appeler le concierge
            </a>
          </Magnetic>
        </PriceReadout>
      </div>
    </div>
  )
}

export default function VehicleRental() {
  return (
    <div style={{ ['--accent' as string]: brand.accent }}>
      <Hero
        brand={brand}
        scene={
          <SceneCanvas camera={{ position: [5, 1.8, 6], fov: 36 }}>
            <CarScene color={brand.accent} autoRotate />
          </SceneCanvas>
        }
        ctaLabel="Configurer ma location"
        ctaHref="#configurateur"
        secondaryLabel="Voir la flotte"
        secondaryHref="#flotte"
      />

      <Marquee
        items={['Gran Turismo', 'Supercars', 'Grandes routières', 'SUV signature', 'Cabriolets', 'Youngtimers']}
        reverse
      />

      {/* Configurator */}
      <section className="section wrap" id="configurateur">
        <div className="cfg-section__head">
          <SectionHeader
            eyebrow="Configurateur 3D temps réel"
            title={<>Composez votre voiture, <em>obtenez votre tarif</em></>}
          />
          <p className="muted" style={{ maxWidth: '30ch' }}>
            Modèle, teinte, finition, durée, kilométrage : tout se règle ici.
            Aucun appel nécessaire — sauf si vous le souhaitez.
          </p>
        </div>
        <VehicleConfigurator />
      </section>

      {/* Fleet */}
      <section className="section wrap" id="flotte">
        <SectionHeader
          eyebrow="La flotte"
          title="Une collection, pas un parc"
          intro="Chaque véhicule est sélectionné, préparé et livré par nos soins. Carrosserie immaculée, plein effectué, et un concierge dédié à chaque remise de clés."
        />
        <FeatureGrid
          items={[
            { title: 'Gran Turismo', body: 'Le grand voyage à 300 km/h de confort. V8 biturbo, intérieur cuir pleine fleur, échappement signature.', icon: '🏁' },
            { title: 'Supercars', body: 'V12 atmosphérique, portes papillon, sensations brutes. Pour les jours où vous ne passez pas inaperçu.', icon: '⚡' },
            { title: 'SUV Signature', body: 'La présence et la polyvalence, sans compromis sur le raffinement. Idéal stations et longues distances.', icon: '🏔️' },
            { title: 'Livraison voiturier', body: 'Hôtel, aéroport, villa : nous livrons où vous êtes, 24h/24, dans toute la zone Paris–Monaco–Milan.', icon: '🔑' },
            { title: 'Assurance premium', body: 'Couverture tous risques incluse, franchise rachetable. Roulez l’esprit parfaitement libre.', icon: '🛡️' },
            { title: 'Conciergerie', body: 'Restaurants, circuits, événements : votre concierge orchestre l’expérience au-delà du volant.', icon: '🤍' },
          ]}
        />
      </section>

      {/* Process */}
      <section className="section band">
        <div className="wrap">
          <SectionHeader eyebrow="Comment ça marche" title="Quatre gestes, zéro friction" />
          <Steps
            items={[
              { title: 'Configurez', body: 'Choisissez le modèle, la teinte et la durée dans le configurateur 3D. Le tarif s’affiche en direct.' },
              { title: 'Validez', body: 'Réservez en ligne en quelques secondes, ou appelez le concierge pour une demande sur-mesure.' },
              { title: 'Recevez', body: 'Nous livrons le véhicule préparé à l’adresse de votre choix, à l’heure dite.' },
              { title: 'Conduisez', body: 'Prenez le volant. Nous récupérons la voiture où vous le souhaitez à la fin de la location.' },
            ]}
          />
        </div>
      </section>

      <section className="section wrap">
        <Stats
          items={[
            { value: 60, suffix: '+', label: 'Véhicules d’exception' },
            { value: 3, label: 'Villes · livraison' },
            { value: 24, suffix: '/7', label: 'Conciergerie' },
            { value: 30, suffix: ' min', label: 'Réservation à clé' },
          ]}
        />
      </section>

      <section className="section wrap" id="reserver">
        <Quote
          quote="J’ai configuré la voiture le matin, elle était devant l’hôtel à midi. Du jamais vu."
          author="Alexandre M."
          role="Client · Monaco"
        />
      </section>

      <Footer brand={brand} ctaTitle={<>Prenez le <em>volant</em>.</>} phone="+33 1 86 76 00 00" />
    </div>
  )
}
