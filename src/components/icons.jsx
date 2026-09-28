// Minimal inline icon set — kept dependency-free rather than pulling in an
// icon library for a handful of glyphs. All use currentColor so they pick
// up whatever text color class wraps them.

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function MapPinIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function PhoneIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

export function FacebookIcon(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M13.5 21v-7.5H16l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.35C16.22 4.31 15.27 4.23 14.16 4.23c-2.32 0-3.91 1.42-3.91 4.02V10.5H7.8v3h2.45V21h3.25Z" />
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TelegramIcon(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M21.9 4.3 3.4 11.5c-1.2.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.1-2 4.4 3.2c.8.5 1.4.2 1.6-.7l2.9-13.7c.3-1.2-.4-1.7-1.6-1.9ZM8.9 13.9l9-5.7c.4-.3.8-.1.5.2l-7.3 6.6-.3 3.2Z" />
    </svg>
  )
}

export function TikTokIcon(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M16.5 3c.4 2.2 1.9 3.7 4.1 3.9v2.8c-1.4.1-2.7-.3-4.1-1.2v6.8c0 3.4-2.8 5.9-6 5.9-3.3 0-6-2.6-6-5.9s2.7-5.9 6-5.9c.3 0 .6 0 .9.1v2.9a2.9 2.9 0 0 0-.9-.1c-1.6 0-3 1.3-3 3s1.4 3 3 3 3.1-1.3 3.1-3V3h2.9Z" />
    </svg>
  )
}

export function WhatsAppIcon(props) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.3A9 9 0 1 0 12 3Zm4.9 12.7c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.5-4-.1-.2-1-1.4-1-2.7 0-1.3.7-1.9.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.7 1.9.8 2 .1.2.1.4 0 .6-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.5 1.5.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.6.3.1.2.1.9-.1 1.4Z" />
    </svg>
  )
}
