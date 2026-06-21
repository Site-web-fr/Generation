import { useMemo, useState } from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import { OptionGroup, PriceReadout, RangeField } from '../components/configurator'
import { FeatureGrid, Quote, SectionHeader, Stats, Steps } from '../components/sections'
import { aed } from '../lib/format'
import { BRAND_MAP } from '../theme/brands'
import { JetSki as JetSkiModel } from '../three/Craft'
import SceneCanvas from '../three/SceneCanvas'
import WaveScene from '../three/WaveScene'
import './landing.css'

const brand = BRAND_MAP.jetski

const CRAFTS = [
  { id: 'solo', label: 'Sea-Doo Spark', sub: 'Agile · solo', rate: 320 },
  { id: 'gti', label: 'GTI 170', sub: 'Confort · biplace', rate: 460 },
  { id: 'rxp', label: 'RXP-X 325', sub: 'Hyper-sport', rate: 690 },
] as const

const DURATIONS = [
  { id: '30', label: '30 min', sub: '', mult: 0.5 },
  { id: '60', label: '1 heure', sub: '', mult: 1 },
  { id: '120', label: '2 heures', sub: '-10%', mult: 1.8 },
  { id: '240', label: 'Demi-journée', sub: '-20%', mult: 3.2 },
] as const

const SLOTS = [
  { id: 'sunrise', label: 'Lever du soleil', sub: '06:00' },
  { id: 'day', label: 'Journée', sub: '10:00 – 16:00' },
  { id: 'sunset', label: 'Golden hour', sub: '17:30' },
] as const

function SessionConfigurator() {
  const [craftId, setCraftId] = useState<(typeof CRAFTS)[number]['id']>('gti')
  const [durId, setDurId] = useState<(typeof DURATIONS)[number]['id']>('60')
  const [slot, setSlot] = useState<(typeof SLOTS)[number]['id']>('sunset')
  const [riders, setRiders] = useState(2)
  const [guide, setGuide] = useState<'no' | 'yes'>('yes')

  const total = useMemo(() => {
    const craft = CRAFTS.find((c) => c.id === craftId)!
    const dur = DURATIONS.find((d) => d.id === durId)!
    const machines = Math.ceil(riders / 2)
    const base = craft.rate * dur.mult * machines
    const slotMult = slot === 'sunset' ? 1.15 : 1
    const guideFee = guide === 'yes' ? 250 * (Number(durId) >= 120 ? 2 : 1) : 0
    return Math.round(base * slotMult + guideFee)
  }, [craftId, durId, slot, riders, guide])

  return (
    <div className="config">
      <div className="config__visual">
        <SceneCanvas camera={{ position: [0, 1.6, 6.5], fov: 45 }}>
          <WaveScene
            colorDeep="#0a3a4a"
            colorCrest={brand.accent}
            amplitude={0.7}
            speed={1.6}
          >
            <JetSkiModel color={brand.accent} />
          </WaveScene>
        </SceneCanvas>
        <span className="config__hint">Dubai Marina · skyline en direct</span>
      </div>
      <div className="config__panel card">
        <OptionGroup
          label="Machine"
          options={CRAFTS.map((c) => ({ id: c.id, label: c.label, sub: c.sub }))}
          value={craftId}
          onChange={setCraftId}
        />
        <OptionGroup label="Durée" options={DURATIONS} value={durId} onChange={setDurId} />
        <OptionGroup label="Créneau" options={SLOTS} value={slot} onChange={setSlot} />
        <RangeField
          label="Riders"
          min={1}
          max={6}
          value={riders}
          onChange={setRiders}
          format={(v) => `${v} ${v > 1 ? 'personnes' : 'personne'}`}
        />
        <OptionGroup
          label="Guide & sécurité"
          options={[
            { id: 'yes', label: 'Avec guide', sub: 'recommandé' },
            { id: 'no', label: 'En autonomie', sub: 'permis requis' },
          ]}
          value={guide}
          onChange={setGuide}
        />
        <PriceReadout
          caption="Votre session · tout équipement inclus"
          amount={aed.format(total)}
          note="Gilets, briefing sécurité et carburant compris. Annulation gratuite jusqu’à 24 h."
        >
          <Magnetic strength={0.35}>
            <a className="btn btn--solid" href="#book" data-cursor="hover" data-cursor-label="Book">
              <span className="btn__dot" />
              Réserver mon créneau
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a className="btn btn--ghost" href="tel:+97140000000" data-cursor="hover">
              WhatsApp concierge
            </a>
          </Magnetic>
        </PriceReadout>
      </div>
    </div>
  )
}

export default function JetSki() {
  return (
    <div style={{ ['--accent' as string]: brand.accent }}>
      <Hero
        brand={brand}
        scene={
          <SceneCanvas camera={{ position: [0, 1.8, 7], fov: 48 }}>
            <WaveScene colorDeep="#072e3c" colorCrest={brand.accent} amplitude={0.75} speed={1.7}>
              <JetSkiModel color={brand.accent} />
            </WaveScene>
          </SceneCanvas>
        }
        ctaLabel="Réserver une session"
        ctaHref="#configurateur"
        secondaryLabel="Les parcours"
        secondaryHref="#parcours"
      />

      <Marquee
        items={['Burj Al Arab', 'Palm Jumeirah', 'Dubai Marina', 'Atlantis', 'Skyline', 'Golden hour']}
      />

      <section className="section wrap" id="configurateur">
        <div className="cfg-section__head">
          <SectionHeader
            eyebrow="Configurateur de session"
            title={<>Réglez votre montée <em>d’adrénaline</em></>}
          />
          <p className="muted" style={{ maxWidth: '30ch' }}>
            Machine, durée, créneau, guide : composez votre sortie et obtenez le
            prix instantanément. Réservation en ligne, départ immédiat.
          </p>
        </div>
        <SessionConfigurator />
      </section>

      <section className="section wrap" id="parcours">
        <SectionHeader
          eyebrow="Les parcours"
          title="Dubaï vue de l’eau"
          intro="Des itinéraires pensés pour le frisson et la carte postale. Encadrés par des guides certifiés, au plus près des icônes de la ville."
        />
        <FeatureGrid
          items={[
            { title: 'Burj Al Arab Loop', body: 'Le tour signature au pied de l’hôtel-voile. La photo que tout le monde veut.', icon: '⛵' },
            { title: 'Palm & Atlantis', body: 'Longez les frondes du Palm Jumeirah jusqu’à la façade d’Atlantis The Palm.', icon: '🌴' },
            { title: 'Marina Skyline', body: 'Slalom entre les gratte-ciels de Dubai Marina, moteur grondant.', icon: '🏙️' },
            { title: 'Golden Hour', body: 'La sortie au coucher du soleil : lumière dorée, mer d’huile, souvenirs inoubliables.', icon: '🌅' },
            { title: 'Équipement premium', body: 'Machines dernière génération, gilets haut de gamme, GoPro en option.', icon: '🛟' },
            { title: 'Sécurité totale', body: 'Briefing complet, guides certifiés et assistance permanente sur l’eau.', icon: '🦺' },
          ]}
        />
      </section>

      <section className="section band">
        <div className="wrap">
          <SectionHeader eyebrow="Express" title="De la réservation à la vague" />
          <Steps
            items={[
              { title: 'Configurez', body: 'Choisissez machine, durée et créneau. Le tarif s’affiche en direct, sans surprise.' },
              { title: 'Réservez', body: 'Paiement en ligne sécurisé ou WhatsApp avec notre concierge. Confirmation immédiate.' },
              { title: 'Présentez-vous', body: 'Rendez-vous au ponton de Dubai Marina. Briefing, équipement, et c’est parti.' },
              { title: 'Ride', body: 'Plein gaz au pied du Burj Al Arab, accompagné de votre guide.' },
            ]}
          />
        </div>
      </section>

      <section className="section wrap">
        <Stats
          items={[
            { value: 12, label: 'Machines dernière génération' },
            { value: 4, label: 'Parcours signature' },
            { value: 4, suffix: '.9★', label: 'Note moyenne' },
            { value: 5, suffix: ' min', label: 'Du ponton à l’eau' },
          ]}
        />
      </section>

      <section className="section wrap" id="book">
        <Quote
          quote="Le coucher de soleil au pied du Burj Al Arab, plein gaz. Le meilleur moment de tout mon séjour."
          author="Lina K."
          role="Cliente · Dubaï"
        />
      </section>

      <Footer brand={brand} ctaTitle={<>Dubaï vous attend, <em>plein gaz</em>.</>} phone="+971 4 000 0000" />
    </div>
  )
}
