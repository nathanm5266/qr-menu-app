import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ onViewMenu, onViewVip, hasVip }) {
  const [open, setOpen] = useState(false)

  function go(action) {
    setOpen(false)
    action?.()
  }

  return (
    <div className="sticky top-0 z-30">
      <nav className="flex items-center justify-between bg-ink px-4 sm:px-8 h-16">
        <img
          src="/logo.jpg"
          alt="Misrak Ber Dukem Butcher & Bar"
          className="h-11 w-11 rounded-full object-cover border-2 border-gold shadow-md transition-transform duration-200 hover:scale-105"
        />

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex flex-col gap-[5px] p-2 -mr-2"
        >
          <span
            className={`block h-[2px] w-6 bg-paper transition-transform duration-300 ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-paper transition-opacity duration-200 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-paper transition-transform duration-300 ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Slide-down panel */}
      <div
        className={`bg-ink overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? 'max-h-60' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-6 pb-4 gap-1">
          <button
            onClick={() => go(onViewMenu)}
            className="text-left py-2.5 text-paper/90 hover:text-gold transition-colors font-body text-[15px]"
          >
            Menu
          </button>
          {hasVip && (
            <button
              onClick={() => go(onViewVip)}
              className="text-left py-2.5 text-paper/90 hover:text-gold transition-colors font-body text-[15px]"
            >
              VIP Menu
            </button>
          )}
          <Link
            to="/admin/login"
            onClick={() => setOpen(false)}
            className="py-2.5 text-paper/60 hover:text-gold transition-colors font-body text-[13px] border-t border-paper/10 mt-1 pt-3"
          >
            Owner sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
