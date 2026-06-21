import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Brand } from '../theme/brands'
import { BRANDS } from '../theme/brands'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import './Footer.css'

interface FooterProps {
  brand?: Brand
  /** CTA headline override */
  ctaTitle?: ReactNode
  /** phone number to call */
  phone?: string
}

export default function Footer({ brand, ctaTitle, phone = '+33 1 86 76 00 00' }: FooterProps) {
  return (
    <footer className="footer">
      <div className="wrap">
        <Reveal>
          <div className="footer__cta">
            <span className="eyebrow">Parlons de votre projet</span>
            <h2 className="display footer__cta-title">
              {ctaTitle || (
                <>
                  Une idée d’exception ?<br />
                  <em>Donnons-lui vie.</em>
                </>
              )}
            </h2>
            <Magnetic strength={0.4}>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="btn btn--solid"
                data-cursor="hover"
                data-cursor-label="Appeler"
              >
                <span className="btn__dot" />
                {phone}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__brand">ATELIER</div>
            <p className="muted footer__about">
              Studio d’expériences digitales premium. 200 talents — direction
              artistique, ingénierie 3D, motion et stratégie de marque.
            </p>
          </div>

          <div className="footer__col">
            <span className="footer__heading">Les univers</span>
            <ul>
              {BRANDS.map((b) => (
                <li key={b.id}>
                  <Link to={b.path} data-cursor="hover">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <span className="footer__heading">Contact</span>
            <ul>
              <li>
                <a href={`tel:${phone.replace(/\s/g, '')}`} data-cursor="hover">
                  {phone}
                </a>
              </li>
              <li>
                <a href="mailto:studio@atelier.example" data-cursor="hover">
                  studio@atelier.example
                </a>
              </li>
              <li className="muted">{brand ? brand.location : 'Paris · Monaco · Dubaï'}</li>
            </ul>
          </div>
        </div>

        <div className="footer__legal">
          <span>© {new Date().getFullYear()} ATELIER — Démonstration commerciale.</span>
          <span>Conçu &amp; développé sur-mesure · React + Three.js</span>
        </div>
      </div>
    </footer>
  )
}
