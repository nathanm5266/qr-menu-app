import { useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { useMenuData } from '../hooks/useMenuData.js'
import ItemEditModal from '../components/ItemEditModal.jsx'
import CategoryManager from '../components/CategoryManager.jsx'

export default function AdminDashboard() {
  const {
    categories,
    items,
    loading,
    updateItem,
    addItem,
    deleteItem,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useMenuData()

  const [editingItem, setEditingItem] = useState(null) // item object, or {} for "new", or null for closed
  const [toggling, setToggling] = useState(null)

  async function handleToggleSoldOut(item) {
    setToggling(item.id)
    try {
      await updateItem(item.id, { sold_out: !item.sold_out })
    } finally {
      setToggling(null)
    }
  }

  async function handleSave(form) {
    if (form.id) {
      const { id, ...changes } = form
      await updateItem(id, changes)
    } else {
      await addItem(form)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item? This cannot be undone.')) return
    await deleteItem(id)
    setEditingItem(null)
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-line">
        <h1 className="font-display text-xl text-ink">Menu dashboard</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm text-ink/60 hover:text-ink"
        >
          Sign out
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-5 sm:px-8 py-8">
        <CategoryManager
          categories={categories}
          onAdd={(name) => addCategory({ name, sort_order: categories.length })}
          onRename={(id, name) => updateCategory(id, { name })}
          onDelete={(id) => {
            if (confirm('Delete this category and all its items?')) deleteCategory(id)
          }}
        />

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-ink">Items</h3>
          <button
            onClick={() => setEditingItem({})}
            disabled={categories.length === 0}
            className="text-sm bg-ink text-paper px-3 py-2 rounded-sm disabled:opacity-40"
          >
            + Add item
          </button>
        </div>

        {categories.length === 0 && (
          <p className="text-sm text-ink/50 mb-6">Add a category first, then add items to it.</p>
        )}

        {loading ? (
          <p className="text-sm text-ink/50">Loading…</p>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const cat = categories.find((c) => c.id === item.category_id)
              return (
                <li key={item.id} className="py-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-ink text-sm font-medium truncate">{item.name}</p>
                    <p className="text-ink/45 text-xs">
                      {cat?.name ?? 'Uncategorized'} · {Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  <label className="flex items-center gap-1.5 text-xs text-ink/60 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={item.sold_out}
                      disabled={toggling === item.id}
                      onChange={() => handleToggleSoldOut(item)}
                    />
                    Sold out
                  </label>

                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-xs text-gold hover:underline"
                  >
                    Edit
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </main>

      {editingItem !== null && (
        <ItemEditModal
          item={editingItem.id ? editingItem : null}
          categories={categories}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
