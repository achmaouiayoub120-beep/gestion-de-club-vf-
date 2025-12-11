"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface Activite {
  id: string
  nom: string
  description: string
  entraineurId: string
  niveauDifficulte: "débutant" | "intermédiaire" | "avancé"
  maxAdherents: number
}

interface Entraineur {
  id: string
  nom: string
  prenom: string
}

interface ActiviteFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (activite: Activite) => void
  entraineurs: Entraineur[]
  initialData?: Activite | null
}

export function ActiviteForm({ isOpen, onClose, onSubmit, entraineurs, initialData }: ActiviteFormProps) {
  const [formData, setFormData] = useState<Activite>(
    initialData || {
      id: Date.now().toString(),
      nom: "",
      description: "",
      entraineurId: "",
      niveauDifficulte: "débutant",
      maxAdherents: 0,
    },
  )

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        id: Date.now().toString(),
        nom: "",
        description: "",
        entraineurId: "",
        niveauDifficulte: "débutant",
        maxAdherents: 0,
      })
    }
  }, [isOpen, initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nom.trim() || !formData.entraineurId) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-bold">{initialData ? "Modifier Activité" : "Ajouter Activité"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom de l'Activité *</label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Ex: Football Senior"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Entraîneur *</label>
            <select
              value={formData.entraineurId}
              onChange={(e) => setFormData({ ...formData, entraineurId: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Sélectionner un entraîneur</option>
              {entraineurs.map((entraineur) => (
                <option key={entraineur.id} value={entraineur.id}>
                  {entraineur.prenom} {entraineur.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Niveau de Difficulté</label>
            <select
              value={formData.niveauDifficulte}
              onChange={(e) => setFormData({ ...formData, niveauDifficulte: e.target.value as any })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="débutant">Débutant</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Max Adhérents</label>
            <input
              type="number"
              value={formData.maxAdherents}
              onChange={(e) => setFormData({ ...formData, maxAdherents: Number.parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Nombre max"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              {initialData ? "Modifier" : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-muted text-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors font-medium"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
