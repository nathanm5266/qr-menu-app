import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient.js'

// Loads categories and menu items, and keeps them live-synced across
// devices using Supabase Realtime — so if the owner edits a price on their
// phone, a customer's already-open menu updates without a refresh.
export function useMenuData() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [{ data: cats, error: catErr }, { data: menuItems, error: itemErr }] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('menu_items').select('*').order('sort_order', { ascending: true }),
    ])
    if (catErr || itemErr) {
      setError(catErr || itemErr)
    } else {
      setCategories(cats)
      setItems(menuItems)
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()

    // Subscribe to live changes so every open tab / phone stays in sync.
    const channel = supabase
      .channel('public:menu-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, fetchAll)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [fetchAll])

  async function updateItem(id, changes) {
    const { error: err } = await supabase.from('menu_items').update(changes).eq('id', id)
    if (err) throw err
  }

  async function addItem(item) {
    const { error: err } = await supabase.from('menu_items').insert(item)
    if (err) throw err
  }

  async function deleteItem(id) {
    const { error: err } = await supabase.from('menu_items').delete().eq('id', id)
    if (err) throw err
  }

  async function addCategory(category) {
    const { error: err } = await supabase.from('categories').insert(category)
    if (err) throw err
  }

  async function updateCategory(id, changes) {
    const { error: err } = await supabase.from('categories').update(changes).eq('id', id)
    if (err) throw err
  }

  async function deleteCategory(id) {
    const { error: err } = await supabase.from('categories').delete().eq('id', id)
    if (err) throw err
  }

  return {
    categories,
    items,
    loading,
    error,
    refresh: fetchAll,
    updateItem,
    addItem,
    deleteItem,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}
