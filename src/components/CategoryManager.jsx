import { useState } from 'react'

export default function CategoryManager({ categories, onAdd, onRename, onDelete }) {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')

  async function handleAdd(e) {
    e.preventDefault()
    if (!newName.trim()) return
    await onAdd(newName.trim())
    setNewName('')
  }

  function startEdit(cat) {
    setEditingId(cat.id)
    setEditValue(cat.name)
  }

  async function commitEdit(id) {
    if (editValue.trim()) await onRename(id, editValue.trim())
    setEditingId(null)
  }

  return (
    <div className="mb-8 border border-line rounded-sm p-4 bg-white/40">
      <h3 className="font-display text-lg text-ink mb-3">Categories</h3>
      <ul className="space-y-2 mb-4">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center gap-2">
            {editingId === cat.id ? (
              <input
                className="input flex-1"
                value={editValue}
                autoFocus
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => commitEdit(cat.id)}
                onKeyDown={(e) => e.key === 'Enter' && commitEdit(cat.id)}
              />
            ) : (
              <button
                className="flex-1 text-left text-sm text-ink/80 hover:text-ink"
                onClick={() => startEdit(cat)}
              >
                {cat.name}
              </button>
            )}
            <button
              onClick={() => onDelete(cat.id)}
              className="text-xs text-rust/70 hover:text-rust"
              title="Delete category and its items"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="New category, e.g. Desserts"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit" className="px-3 py-2 bg-ink text-paper text-sm rounded-sm">
          Add
        </button>
      </form>
    </div>
  )
}
