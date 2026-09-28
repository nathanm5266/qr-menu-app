export default function CategoryNav({ categories, activeId, onSelect }) {
  return (
    <nav
      className="sticky top-16 z-20 bg-paper/95 backdrop-blur border-b-2 border-wine/15 shadow-sm"
      aria-label="Menu categories"
    >
      <div className="flex gap-2 overflow-x-auto px-4 sm:px-8 py-3 no-scrollbar">
        {categories.map((cat) => {
          const active = cat.id === activeId
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 font-display text-[16px] tracking-wide transition-all duration-200 ${
                active
                  ? 'bg-wine text-paper shadow-md scale-105'
                  : 'text-wine/60 hover:text-wine hover:bg-wineTint'
              }`}
            >
              {cat.name}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
