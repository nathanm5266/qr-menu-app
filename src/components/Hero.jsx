export default function Hero({ name, tagline, onViewMenu }) {
  return (
    <section className="relative h-[78vh] min-h-[420px] max-h-[640px] w-full overflow-hidden">
      <img
        src="/hero-sega.jpg"
        alt="Freshly prepared meat platter"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Wine-toned scrim for text legibility, echoing the brand color */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-wine/50 to-ink/80" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="font-display italic text-gold text-sm sm:text-base mb-2 tracking-wide">
          {tagline}
        </p>
        <h1 className="font-display text-[36px] sm:text-[54px] leading-tight text-paper drop-shadow-md max-w-xl">
          {name}
        </h1>

        <button
          onClick={onViewMenu}
          className="mt-8 bg-wine hover:bg-wineDeep text-paper font-body text-[15px] px-7 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
        >
          Check Menu
        </button>
      </div>
    </section>
  )
}
