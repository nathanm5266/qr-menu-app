export default function MenuItemRow({ item }) {
  const soldOut = item.sold_out

  return (
    <div className={`flex gap-4 py-5 border-b border-line/70 ${soldOut ? 'opacity-50' : ''}`}>
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-sm flex-shrink-0 bg-paper2"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : null}

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline">
          <h3 className="font-display text-[19px] leading-snug text-ink">{item.name}</h3>
          <span className="leader" aria-hidden="true" />
          <span className="font-display text-[17px] text-gold whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>

        {item.description ? (
          <p className="mt-1 text-[14px] leading-relaxed text-ink/60 pr-2">{item.description}</p>
        ) : null}

        {soldOut ? (
          <span className="inline-block mt-2 text-[11px] tracking-wide font-medium text-rust border border-rust/40 rounded-full px-2 py-0.5">
            Sold out today
          </span>
        ) : null}
      </div>
    </div>
  )
}

function formatPrice(value) {
  const n = Number(value)
  if (Number.isNaN(n)) return value
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
