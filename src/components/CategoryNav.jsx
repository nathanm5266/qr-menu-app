export default function CategoryNav({ categories, activeId, onSelect }) {
  return (
    <nav
      className="sticky top-0 z-20 bg-paper/95 backdrop-blur border-b border-line"
      aria-label="Menu categories"
    >
      <div className="flex gap-6 overflow-x-auto px-4 sm:px-8 no-scrollbar">
        {categories.map((cat) => {
          const active = cat.id === activeId
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`relative whitespace-nowrap py-4 font-body text-[15px] transition-colors ${
                active ? 'text-ink' : 'text-ink/45 hover:text-ink/70'
              }`}
            >
              {cat.name}
              {active && (
                <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-gold rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
