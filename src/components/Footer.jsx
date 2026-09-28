import { FaFacebookF, FaInstagram, FaTelegramPlane, FaTiktok } from 'react-icons/fa'

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-wine text-paper text-[17px] transition-all duration-200 hover:scale-110 hover:bg-wineDeep hover:shadow-md"
    >
      {children}
    </a>
  )
}

export default function Footer({ info }) {
  if (!info) return null

  const hasSocial =
    info.facebook_url || info.instagram_url || info.telegram_url || info.tiktok_url

  return (
    <footer className="border-t border-line bg-paper2/60 mt-4">
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-10 grid gap-8 sm:grid-cols-2">
        {(info.address || info.maps_url) && (
          <div>
            <h3 className="font-display text-wine text-lg mb-2">Address</h3>
            {info.address && <p className="text-ink/70 text-sm mb-1">{info.address}</p>}
            {info.maps_url && (
              <a
                href={info.maps_url}
                target="_blank"
                rel="noreferrer"
                className="text-gold text-sm hover:underline"
              >
                Get directions →
              </a>
            )}
          </div>
        )}

        {(info.phone_1 || info.phone_2 || info.email) && (
          <div>
            <h3 className="font-display text-wine text-lg mb-2">Contact</h3>
            {info.phone_1 && (
              <a href={`tel:${info.phone_1}`} className="block text-ink/70 text-sm hover:text-wine">
                {info.phone_1}
              </a>
            )}
            {info.phone_2 && (
              <a href={`tel:${info.phone_2}`} className="block text-ink/70 text-sm hover:text-wine">
                {info.phone_2}
              </a>
            )}
            {info.email && (
              <a href={`mailto:${info.email}`} className="block text-ink/70 text-sm hover:text-wine">
                {info.email}
              </a>
            )}
          </div>
        )}
      </div>

      {hasSocial && (
        <div className="max-w-2xl mx-auto px-6 sm:px-8 pb-8">
          <h3 className="font-display text-wine text-lg mb-3">Follow us</h3>
          <div className="flex gap-3">
            {info.facebook_url && (
              <SocialLink href={info.facebook_url} label="Facebook">
                <FaFacebookF />
              </SocialLink>
            )}
            {info.instagram_url && (
              <SocialLink href={info.instagram_url} label="Instagram">
                <FaInstagram />
              </SocialLink>
            )}
            {info.telegram_url && (
              <SocialLink href={info.telegram_url} label="Telegram">
                <FaTelegramPlane />
              </SocialLink>
            )}
            {info.tiktok_url && (
              <SocialLink href={info.tiktok_url} label="TikTok">
                <FaTiktok />
              </SocialLink>
            )}
          </div>
        </div>
      )}
    </footer>
  )
}
