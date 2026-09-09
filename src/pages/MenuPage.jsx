import { useEffect, useRef, useState } from 'react'
import { useMenuData } from '../hooks/useMenuData.js'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import CategoryNav from '../components/CategoryNav.jsx'
import MenuItemRow from '../components/MenuItemRow.jsx'

const RESTAURANT_NAME = 'Misrak Addis Hotel & Butchery'
const RESTAURANT_TAGLINE = 'Fresh cuts, fire-grilled, served with tradition'

export default function MenuPage() {
  const { categories, items, loading, error } = useMenuData()
  const [activeId, setActiveId] = useState(null)
  const [mode, setMode] = useState('regular') // 'regular' | 'vip'
  const sectionRefs = useRef({})
  const menuStartRef = useRef(null)

  // Regular categories are what a walk-in customer sees first.
  // VIP-labelled categories are tucked behind a separate toggle.
  const regularCategories = categories.filter((c) => !c.name.trim().toLowerCase().startsWith('vip'))
  const vipCategories = categories.filter((c) => c.name.trim().toLowerCase().startsWith('vip'))
  const visibleCategories = mode === 'vip' ? vipCategories : regularCategories

  useEffect(() => {
    if (visibleCategories.length) setActiveId(visibleCategories[0].id)
  }, [mode, categories.length]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!visibleCategories.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const topMost = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
          setActiveId(Number(topMost.target.dataset.categoryId))
        }
      },
      { rootMargin: '-120px 0px -70% 0px', threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [visibleCategories, items])

  function scrollToCategory(id) {
    setActiveId(id)
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function scrollToMenu() {
    menuStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink/50 font-body text-sm">
        Setting the table…
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-2">
        <p className="font-display text-xl text-ink">The menu can't load right now</p>
        <p className="text-ink/60 text-sm max-w-xs">
          Please check your connection and try again, or ask a member of staff for a printed menu.
        </p>
      </div>
    )
  }

  const itemsByCategory = visibleCategories.map((cat) => ({
    ...cat,
    items: items
      .filter((i) => i.category_id === cat.id)
      .slice()
      .sort((a, b) => Number(b.price) - Number(a.price)),
  }))

  return (
    <div className="min-h-screen bg-paper">
      <Navbar
        onViewMenu={() => {
          setMode('regular')
          scrollToMenu()
        }}
        onViewVip={() => {
          setMode('vip')
          scrollToMenu()
        }}
        hasVip={vipCategories.length > 0}
      />

      <Hero name={RESTAURANT_NAME} tagline={RESTAURANT_TAGLINE} onViewMenu={scrollToMenu} />

      <div ref={menuStartRef} className="scroll-mt-0" />

      {visibleCategories.length > 0 && (
        <CategoryNav categories={visibleCategories} activeId={activeId} onSelect={scrollToCategory} />
      )}

      <main className="max-w-2xl mx-auto px-5 sm:px-8 pb-24">
        {itemsByCategory.length === 0 && (
          <p className="text-center text-ink/50 py-20 font-body text-sm">
            The menu is being set up. Please check back shortly.
          </p>
        )}

        {itemsByCategory.map((cat) => (
          <section
            key={cat.id}
            id={`cat-${cat.id}`}
            data-category-id={cat.id}
            ref={(el) => (sectionRefs.current[cat.id] = el)}
            className="pt-10 scroll-mt-24"
          >
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-display text-[28px] sm:text-[30px] font-medium text-wine tracking-wide">
                {cat.name}
              </h2>
              <span className="flex-1 h-[2px] bg-wine/20 rounded-full" />
            </div>
            {cat.description ? (
              <p className="text-ink/50 text-sm mb-2">{cat.description}</p>
            ) : (
              <div className="h-2" />
            )}

            {cat.items.length === 0 ? (
              <p className="text-ink/40 text-sm py-4">Nothing listed here yet.</p>
            ) : (
              cat.items.map((item) => <MenuItemRow key={item.id} item={item} />)
            )}
          </section>
        ))}
      </main>

      <footer className="text-center text-ink/35 text-xs font-body pb-8">
        Prices in local currency, inclusive of tax.
      </footer>
    </div>
  )
}
