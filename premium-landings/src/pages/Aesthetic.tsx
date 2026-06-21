import { useState } from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import { OptionGroup, PriceReadout } from '../components/configurator'
import { FeatureGrid, Quote, SectionHeader, Stats, Steps } from '../components/sections'
import { eur } from '../lib/format'
import { BRAND_MAP } from '../theme/brands'
import OrbScene from '../three/OrbScene'
import SceneCanvas from '../three/SceneCanvas'
import './landing.css'
import './aesthetic.css'

const brand = BRAND_MAP.aesthetic

const ZONES = [
  { id: 'visage', label: 'Visage' },
  { id: 'regard', label: 'Regard' },
  { id: 'peau', label: 'Peau' },
  { id: 'silhouette', label: 'Silhouette' },
] as const

const PROTOCOLS: Record<
  (typeof ZONES)[number]['id'],
  { title: string; desc: string; from: number; sessions: string; gradient: string }
> = {
  visage: {
    title: 'Harmonisation du visage',
    desc: 'Rééquilibrage des volumes par acide hyaluronique, profiloplastie et lifting médical. Un résultat naturel, jamais figé.',
    from: 450,
    sessions: '1 à 2 séances',
    gradient: 'linear-gradient(135deg, #5a3a52, #cfa6c9)',
  },
  regard: {
    title: 'Sublimation du regard',
    desc: 'Traitement des cernes, repositionnement des sourcils et blépharoplastie douce pour un regard reposé et ouvert.',
    from: 380,
    sessions: '1 séance',
    gradient: 'linear-gradient(135deg, #3a4a5a, #a6c4cf)',
  },
  peau: {
    title: 'Régénération de la peau',
    desc: 'Protocoles laser, microneedling et boosters d’éclat. Grain de peau affiné, teint unifié, fermeté retrouvée.',
    from: 290,
    sessions: '3 à 4 séances',
    gradient: 'linear-gradient(135deg, #5a4a3a, #cfc0a6)',
  },
  silhouette: {
    title: 'Redéfinition de la silhouette',
    desc: 'Cryolipolyse, radiofréquence et accompagnement médical. Affinez, raffermissez, sans bistouri.',
    from: 520,
    sessions: '2 à 5 séances',
    gradient: 'linear-gradient(135deg, #3a5a4a, #a6cfb8)',
  },
}

function BeforeAfter() {
  const [pos, setPos] = useState(50)
  return (
    <div className="ba">
      <div className="ba__img ba__after" />
      <div className="ba__img ba__before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      <div className="ba__handle" style={{ left: `${pos}%` }}>
        <span className="ba__line" />
        <span className="ba__knob" data-cursor="hover">
          ⇆
        </span>
      </div>
      <span className="ba__tag ba__tag--l">Avant</span>
      <span className="ba__tag ba__tag--r">Après</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="ba__range"
        aria-label="Comparer avant / après"
      />
    </div>
  )
}

function TreatmentExplorer() {
  const [zone, setZone] = useState<(typeof ZONES)[number]['id']>('visage')
  const p = PROTOCOLS[zone]
  return (
    <div className="config">
      <div className="config__visual" style={{ background: p.gradient }}>
        <div className="aesthetic-card">
          <span className="aesthetic-card__sessions">{p.sessions}</span>
          <h3 className="aesthetic-card__title">{p.title}</h3>
        </div>
      </div>
      <div className="config__panel card">
        <OptionGroup
          label="Que souhaitez-vous sublimer ?"
          options={ZONES}
          value={zone}
          onChange={setZone}
        />
        <p className="muted" style={{ fontWeight: 300, lineHeight: 1.6 }}>
          {p.desc}
        </p>
        <PriceReadout
          caption="Protocole conseillé · à partir de"
          amount={eur.format(p.from)}
          note="Diagnostic personnalisé offert lors de la première consultation."
        >
          <Magnetic strength={0.35}>
            <a
              className="btn btn--solid"
              href="#rdv"
              data-cursor="hover"
              data-cursor-label="Réserver"
            >
              <span className="btn__dot" />
              Réserver une consultation
            </a>
          </Magnetic>
        </PriceReadout>
      </div>
    </div>
  )
}

export default function Aesthetic() {
  return (
    <div style={{ ['--accent' as string]: brand.accent }}>
      <Hero
        brand={brand}
        scene={
          <SceneCanvas camera={{ position: [0, 0, 6], fov: 42 }}>
            <OrbScene color={brand.accent} />
          </SceneCanvas>
        }
        ctaLabel="Mon diagnostic"
        ctaHref="#diagnostic"
        secondaryLabel="Nos expertises"
        secondaryHref="#expertises"
      />

      <Marquee
        items={['Chirurgie esthétique', 'Médecine anti-âge', 'Laser', 'Injections', 'Régénération', 'Bien-être']}
      />

      <section className="section wrap" id="diagnostic">
        <div className="cfg-section__head">
          <SectionHeader
            eyebrow="Diagnostic interactif"
            title={<>Composez votre <em>protocole</em></>}
          />
          <p className="muted" style={{ maxWidth: '30ch' }}>
            Sélectionnez votre objectif : nous esquissons le parcours conseillé
            et son budget indicatif, avant même votre première visite.
          </p>
        </div>
        <TreatmentExplorer />
      </section>

      <section className="section wrap" id="expertises">
        <SectionHeader
          eyebrow="Nos expertises"
          title="La science au service de votre beauté"
          intro="Une équipe de chirurgiens et médecins esthétiques de renommée internationale, des plateaux techniques de dernière génération, une éthique du résultat naturel."
        />
        <FeatureGrid
          items={[
            { title: 'Chirurgie esthétique', body: 'Rhinoplastie, lifting, chirurgie mammaire et silhouette. Des gestes maîtrisés, des suites encadrées.', icon: '◈' },
            { title: 'Médecine esthétique', body: 'Injections, fils tenseurs, mésothérapie. Des résultats immédiats, sans éviction sociale.', icon: '✦' },
            { title: 'Anti-âge global', body: 'Protocoles régénératifs, longévité cellulaire et accompagnement nutritionnel sur-mesure.', icon: '❋' },
            { title: 'Dermatologie laser', body: 'Taches, rougeurs, cicatrices, relâchement : la technologie au service du grain de peau.', icon: '◇' },
            { title: 'Suivi premium', body: 'Un coordinateur dédié, des rendez-vous fluides et un suivi photographique de votre évolution.', icon: '♡' },
            { title: 'Confidentialité', body: 'Entrées discrètes, salons privatisés et dossiers chiffrés. Votre intimité est sacrée.', icon: '⟡' },
          ]}
        />
      </section>

      <section className="section band">
        <div className="wrap">
          <SectionHeader eyebrow="Comparer" title="Le résultat, sans filtre" align="left" />
          <BeforeAfter />
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <SectionHeader eyebrow="Votre parcours" title="De la consultation au résultat" />
          <Steps
            items={[
              { title: 'Consultation', body: 'Échange approfondi avec le praticien, analyse morphologique et simulation de votre objectif.' },
              { title: 'Protocole sur-mesure', body: 'Un plan détaillé, transparent sur les actes, les délais et le budget.' },
              { title: 'Intervention', body: 'Dans un environnement médical d’excellence, encadré par une équipe dédiée.' },
              { title: 'Suivi & résultat', body: 'Un accompagnement post-soin attentif jusqu’au résultat naturel attendu.' },
            ]}
          />
        </div>
      </section>

      <section className="section wrap">
        <Stats
          items={[
            { value: 18, suffix: ' ans', label: 'D’expertise médicale' },
            { value: 12000, suffix: '+', label: 'Patients accompagnés' },
            { value: 98, suffix: '%', label: 'Satisfaction' },
            { value: 9, label: 'Praticiens experts' },
          ]}
        />
      </section>

      <section className="section wrap" id="rdv">
        <Quote
          quote="Un résultat d’un naturel confondant, et un accompagnement d’une délicatesse rare."
          author="Camille R."
          role="Patiente · Paris"
        />
      </section>

      <Footer brand={brand} ctaTitle={<>Révélez <em>votre lumière</em>.</>} phone="+33 1 86 76 01 01" />
    </div>
  )
}
