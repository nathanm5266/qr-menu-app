import { useState } from 'react'

export default function RestaurantInfoManager({ info, onSave }) {
  const [form, setForm] = useState({
    address: info?.address || '',
    maps_url: info?.maps_url || '',
    phone_1: info?.phone_1 || '',
    phone_2: info?.phone_2 || '',
    email: info?.email || '',
    facebook_url: info?.facebook_url || '',
    instagram_url: info?.instagram_url || '',
    telegram_url: info?.telegram_url || '',
    tiktok_url: info?.tiktok_url || '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(form)
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mb-8 border border-line rounded-sm p-4 bg-white/40">
      <h3 className="font-display text-lg text-ink mb-3">Address, contact & social links</h3>

      <div className="grid gap-3">
        <Field label="Address">
          <input className="input" value={form.address} onChange={(e) => set('address', e.target.value)} />
        </Field>
        <Field label="Google Maps link">
          <input className="input" value={form.maps_url} onChange={(e) => set('maps_url', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone 1">
            <input className="input" value={form.phone_1} onChange={(e) => set('phone_1', e.target.value)} />
          </Field>
          <Field label="Phone 2">
            <input className="input" value={form.phone_2} onChange={(e) => set('phone_2', e.target.value)} />
          </Field>
        </div>
        <Field label="Email (optional)">
          <input className="input" value={form.email} onChange={(e) => set('email', e.target.value)} />
        </Field>
        <Field label="Facebook URL">
          <input className="input" value={form.facebook_url} onChange={(e) => set('facebook_url', e.target.value)} />
        </Field>
        <Field label="Instagram URL">
          <input className="input" value={form.instagram_url} onChange={(e) => set('instagram_url', e.target.value)} />
        </Field>
        <Field label="Telegram URL">
          <input className="input" value={form.telegram_url} onChange={(e) => set('telegram_url', e.target.value)} />
        </Field>
        <Field label="TikTok URL">
          <input className="input" value={form.tiktok_url} onChange={(e) => set('tiktok_url', e.target.value)} />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-ink text-paper px-4 py-2 rounded-sm text-sm disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        {saved && <span className="text-xs text-wine">Saved — live on the site now.</span>}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm text-ink/70 mb-1">{label}</span>
      {children}
    </label>
  )
}
