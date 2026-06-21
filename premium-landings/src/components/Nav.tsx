import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BRANDS } from '../theme/brands'
import Magnetic from './Magnetic'
import './Nav.css'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const active = BRANDS.find((b) => b.path === location.pathname)

  return (
    <>
      <header className="nav">
        <div className="nav__inner wrap">
          <Magnetic strength={0.25}>
            <Link
              to="/"
              className="nav__logo"
              onClick={() => setOpen(false)}
              data-cursor="hover"
              data-cursor-label="Accueil"
            >
              ATELIER
            </Link>
          </Magnetic>

          <div className="nav__current">
            {active ? active.category : 'Suite Premium · 5 univers'}
          </div>

          <button
            className={`nav__toggle ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            data-cursor="hover"
            data-cursor-label={open ? 'Fermer' : 'Menu'}
            aria-label="Menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu__inner wrap">
              <div className="menu__label eyebrow">Les cinq univers</div>
              <ul className="menu__list">
                {BRANDS.map((b, i) => (
                  <li key={b.id} style={{ ['--accent' as string]: b.accent }}>
                    <Link
                      to={b.path}
                      onClick={() => setOpen(false)}
                      className="menu__item"
                      data-cursor="hover"
                      data-cursor-label="Découvrir"
                    >
                      <motion.span
                        className="menu__index"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                      >
                        0{i + 1}
                      </motion.span>
                      <motion.span
                        className="menu__name"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: 0.28 + i * 0.07,
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {b.name}
                      </motion.span>
                      <span className="menu__cat">{b.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="menu__foot">
                <span>ATELIER · Studio d’expériences premium</span>
                <span>200 talents · Paris</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
