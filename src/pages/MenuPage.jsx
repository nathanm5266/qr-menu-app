import { useEffect, useRef, useState } from 'react'
import { useMenuData } from '../hooks/useMenuData.js'
import CategoryNav from '../components/CategoryNav.jsx'
import MenuItemRow from '../components/MenuItemRow.jsx'

const RESTAURANT_NAME = 'Trattoria Fienile'
const RESTAURANT_TAGLINE = 'Wood-fired plates, poured by hand, since 2014'

export default function MenuPage() {
  const { categories, items, loading, error } = useMenuData()
  const [activeId, setActiveId] = useState(null)
  const sectionRefs = useRef({})

  useEffect(() => {
    if (categories.length && !activeId) setActiveId(categories[0].id)
  }, [categories, activeId])

  useEffect(() => {
    if (!categories.length) return
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
  }, [categories, items])

  function scrollToCategory(id) {
    setActiveId(id)
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  const itemsByCategory = categories.map((cat) => ({
    ...cat,
    items: items.filter((i) => i.category_id === cat.id),
  }))

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <header className="px-6 sm:px-8 pt-10 pb-6 text-center border-b border-line">
        <p className="font-display italic text-gold text-sm mb-1">{RESTAURANT_TAGLINE}</p>
        <h1 className="font-display text-[34px] sm:text-[42px] text-ink leading-tight">
          {RESTAURANT_NAME}
        </h1>
      </header>

      {categories.length > 0 && (
        <CategoryNav categories={categories} activeId={activeId} onSelect={scrollToCategory} />
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
            <h2 className="font-display text-[24px] text-ink mb-1">{cat.name}</h2>
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
