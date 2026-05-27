"use client"
import { useState, useEffect } from "react"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore"
import { ArrowLeft, ArrowRight, LogOut, Plus, Edit, Trash2, ArrowLeftRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const COLLECTION = "portfolio"

// TODO: Import Firebase and initialize app here
// import { initializeApp } from "firebase/app"
// import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default function AdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState<any[]>([])
  const [form, setForm] = useState<any>(null)
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Auth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) {
      setError("Firebase is not configured. Please set up environment variables.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      if (result.user.email !== "kernoumehdi17@gmail.com") {
        setError("Access denied. Only the admin can log in.")
        await signOut(auth)
        setUser(null)
      } else {
        setUser(result.user)
      }
    } catch (err: any) {
      setError(err.message || "Login failed.")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth)
    }
    setUser(null)
  }

  // Firestore CRUD
  useEffect(() => {
    if (!user || !db) return
    try {
      const q = query(collection(db, COLLECTION))
      const unsub = onSnapshot(q, (snap) => {
        setCards(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      }, (error) => {
        console.error("Firebase error:", error)
        setCards([])
      })
      return () => unsub()
    } catch (error) {
      console.error("Error fetching cards:", error)
      setCards([])
    }
  }, [user])

  // Always sort by sortOrder (default to 0 if missing)
  const sortedCards = [...cards].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  // Change card order by selecting a number
  const handleOrderChange = async (index: number, newOrder: number) => {
    if (!db) {
      alert("Firebase is not configured.")
      return
    }
    const currentOrder = sortedCards[index].sortOrder ?? index
    if (currentOrder === newOrder) return
    // Create a new array with updated order
    let reordered = [...sortedCards]
    // Remove the card from its current position
    const [movedCard] = reordered.splice(index, 1)
    // Insert the card at the new position
    reordered.splice(newOrder, 0, movedCard)
    // Update sortOrder for all cards
    for (let i = 0; i < reordered.length; i++) {
      if (reordered[i].sortOrder !== i) {
        await updateDoc(doc(db, COLLECTION, reordered[i].id), { sortOrder: i })
      }
    }
  }

  const openAdd = () => {
    setForm({ title: "", description: "", image: "", demoUrl: "", category: "", techs: "", titleFr: "", descriptionFr: "", categoryFr: "" })
    setFormMode("add")
  }
  const openEdit = (card: any) => {
    setForm({ ...card, techs: (card.techs || []).join(", "), titleFr: card.titleFr || "", descriptionFr: card.descriptionFr || "", categoryFr: card.categoryFr || "" })
    setFormMode("edit")
  }
  const closeForm = () => {
    setForm(null)
    setFormMode(null)
  }
  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSave = async (e: any) => {
    e.preventDefault()
    if (!db) {
      alert("Firebase is not configured.")
      return
    }
    setSaving(true)
    const data = {
      ...form,
      techs: form.techs.split(",").map((t: string) => t.trim()).filter(Boolean),
    }
    try {
      if (formMode === "add") {
        // Set sortOrder to the next available position
        const newSortOrder = cards.length
        await addDoc(collection(db, COLLECTION), { ...data, sortOrder: newSortOrder })
      } else if (formMode === "edit") {
        await updateDoc(doc(db, COLLECTION, form.id), data)
      }
      closeForm()
    } catch (err) {
      alert("Error saving card.")
    } finally {
      setSaving(false)
    }
  }
  const handleDelete = async (id: string) => {
    if (!db) {
      alert("Firebase is not configured.")
      return
    }
    if (!window.confirm("Are you sure you want to delete this card?")) return
    await deleteDoc(doc(db, COLLECTION, id))
  }

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Firebase Not Configured</h2>
          <p className="text-gray-600 dark:text-gray-400">Please set up Firebase environment variables to access the admin panel.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">Required: APP_FB_AK, APP_FB_AD, APP_FB_PID, APP_FB_SB, APP_FB_MSID, APP_FB_AID</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col">
      {/* Glassy sticky header */}
      <header className="sticky top-0 z-20 w-full bg-white/60 dark:bg-gray-900/60 shadow-sm flex items-center justify-between px-8 py-4 mb-8">
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
          <ArrowLeftRight size={28} className="mr-2" /> Admin Dashboard
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-gray-700 transition-all font-semibold shadow-sm">
          <LogOut size={18} /> Logout
        </button>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pb-16">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button onClick={openAdd} className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500 transition-all shadow-lg font-semibold text-base">
            <Plus size={20} /> Add Card
          </button>
        </div>
        {/* List cards with order dropdown for each */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {sortedCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="flex flex-col h-full bg-white/70 dark:bg-gray-900/70 border border-blue-100 dark:border-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
                whileHover={{ scale: 1.02 }}
              >
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden">
                  {card.image && (
                    <img src={card.image} alt={card.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                  )}
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-2 flex-shrink-0 flex items-center gap-2">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wider transition-colors duration-300">
                      {card.category}
                      {card.categoryFr && <span className="block text-xs text-blue-500">{card.categoryFr}</span>}
                    </span>
                    <label className="ml-auto flex items-center gap-1 text-xs bg-blue-50 dark:bg-gray-800 px-2 py-1 rounded-full shadow-sm">
                      Order:
                      <select
                        value={index}
                        onChange={e => handleOrderChange(index, Number(e.target.value))}
                        className="border-none bg-transparent focus:ring-2 focus:ring-blue-400 rounded px-1 py-0.5 outline-none"
                      >
                        {sortedCards.map((_, i) => (
                          <option key={i} value={i}>{i + 1}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight transition-colors duration-300 flex-shrink-0">
                    {card.title}
                    {card.titleFr && <span className="block text-xs text-blue-500 font-normal">{card.titleFr}</span>}
                  </h3>
                  <div className="flex-grow mb-4">
                    <div className="max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-900 scrollbar-track-transparent pr-2">
                      <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm transition-colors duration-300">
                        {card.description}
                        {card.descriptionFr && <span className="block text-xs text-blue-500 mt-1">{card.descriptionFr}</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1 mb-4">
                    {(card.techs || []).map((t: string, i: number) => (
                      <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">{t}</span>
                    ))}
                  </div>
                  <a
                    href={card.demoUrl && !/^https?:\/\//.test(card.demoUrl) ? `https://${card.demoUrl}` : card.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full mb-4"
                  >
                    <button className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:from-blue-600 hover:to-blue-500">
                      <span>View Project</span>
                    </button>
                  </a>
                  <div className="flex gap-2 mt-auto">
                    <button onClick={() => openEdit(card)} className="flex-1 flex items-center justify-center gap-1 bg-yellow-400/90 hover:bg-yellow-500 text-white px-3 py-2 rounded-full font-semibold transition-all shadow-md"><Edit size={18} /> Edit</button>
                    <button onClick={() => handleDelete(card.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-500/90 hover:bg-red-600 text-white px-3 py-2 rounded-full font-semibold transition-all shadow-md"><Trash2 size={18} /> Delete</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Add/Edit form */}
        <AnimatePresence>
          {form && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            >
              <form onSubmit={handleSave} className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-blue-100 dark:border-blue-800">
                <button type="button" onClick={closeForm} className="absolute top-2 right-2 text-gray-400 hover:text-black dark:hover:text-white text-2xl">✕</button>
                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">{formMode === "add" ? "Add Card" : "Edit Card"}</h3>
                <input name="title" value={form.title} onChange={handleFormChange} placeholder="Title (English)" className="w-full mb-3 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 focus:ring-2 focus:ring-blue-400 outline-none transition-all" required />
                <input name="titleFr" value={form.titleFr} onChange={handleFormChange} placeholder="Titre (Français)" className="w-full mb-3 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 focus:ring-2 focus:ring-blue-400 outline-none transition-all" />
                <input name="category" value={form.category} onChange={handleFormChange} placeholder="Category (English)" className="w-full mb-3 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 focus:ring-2 focus:ring-blue-400 outline-none transition-all" />
                <input name="categoryFr" value={form.categoryFr} onChange={handleFormChange} placeholder="Catégorie (Français)" className="w-full mb-3 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 focus:ring-2 focus:ring-blue-400 outline-none transition-all" />
                <input name="image" value={form.image} onChange={handleFormChange} placeholder="Image URL" className="w-full mb-3 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 focus:ring-2 focus:ring-blue-400 outline-none transition-all" required />
                <input name="demoUrl" value={form.demoUrl} onChange={handleFormChange} placeholder="Demo URL" className="w-full mb-3 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 focus:ring-2 focus:ring-blue-400 outline-none transition-all" />
                <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Description (English)" className="w-full mb-3 px-4 py-2 rounded-2xl border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 focus:ring-2 focus:ring-blue-400 outline-none transition-all" required rows={3} />
                <textarea name="descriptionFr" value={form.descriptionFr} onChange={handleFormChange} placeholder="Description (Français)" className="w-full mb-3 px-4 py-2 rounded-2xl border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 focus:ring-2 focus:ring-blue-400 outline-none transition-all" rows={3} />
                <input name="techs" value={form.techs} onChange={handleFormChange} placeholder="Techs (comma separated)" className="w-full mb-3 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/20 focus:ring-2 focus:ring-blue-400 outline-none transition-all" />
                <button type="submit" className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 font-semibold text-base shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
} 