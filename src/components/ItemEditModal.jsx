import { useState } from 'react'

const emptyForm = {
  name: '',
  description: '',
  price: '',
  image_url: '',
  category_id: '',
  sold_out: false,
}

export default function ItemEditModal({ item, categories, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(
    item
      ? { ...item, price: String(item.price ?? '') }
      : { ...emptyForm, category_id: categories[0]?.id ?? '' }
  )
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    if (!form.name.trim()) {
      setErr('Give the item a name.')
      return
    }
    if (form.price === '' || Number.isNaN(Number(form.price))) {
      setErr('Enter a valid price.')
      return
    }
    setSaving(true)
    try {
      await onSave({
        ...form,
        price: Number(form.price),
        category_id: Number(form.category_id),
      })
      onClose()
    } catch (e2) {
      setErr(e2.message || 'Something went wrong saving this item.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 px-0 sm:px-4">
      <div className="bg-paper w-full sm:max-w-md sm:rounded-sm max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-t-sm">
        <div className="p-6">
          <h2 className="font-display text-xl text-ink mb-4">
            {item ? 'Edit item' : 'Add item'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Name">
              <input
                className="input"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                required
              />
            </Field>

            <Field label="Description">
              <textarea
                className="input"
                rows={2}
                value={form.description || ''}
                onChange={(e) => set('description', e.target.value)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Price">
                <input
                  className="input"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                  required
                />
              </Field>
              <Field label="Category">
                <select
                  className="input"
                  value={form.category_id}
                  onChange={(e) => set('category_id', e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Image URL (optional)">
              <input
                className="input"
                placeholder="https://i.imgur.com/…"
                value={form.image_url || ''}
                onChange={(e) => set('image_url', e.target.value)}
              />
            </Field>
            <p className="text-xs text-ink/45 -mt-2">
              Paste a link from Imgur, Postimages, or your Supabase Storage bucket.
            </p>

            <label className="flex items-center gap-2 text-sm text-ink/80">
              <input
                type="checkbox"
                checked={form.sold_out}
                onChange={(e) => set('sold_out', e.target.checked)}
              />
              Mark as sold out
            </label>

            {err && <p className="text-rust text-sm">{err}</p>}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-ink text-paper py-2.5 rounded-sm disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-ink/60 hover:text-ink"
              >
                Cancel
              </button>
            </div>

            {item && (
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="w-full text-center text-rust text-sm pt-2"
              >
                Delete this item
              </button>
            )}
          </form>
        </div>
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
