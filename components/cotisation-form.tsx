"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface Cotisation {
  id: string
  adherentId: string
  montant: number
  datePaiement: string
  statut: "payée" | "en attente" | "en retard"
}

interface Adherent {
  id: string
  nom: string
  prenom: string
}

interface CotisationFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (cotisation: Cotisation) => void
  adherents: Adherent[]
  initialData?: Cotisation | null
}

export function CotisationForm({ isOpen, onClose, onSubmit, adherents, initialData }: CotisationFormProps) {
  const [formData, setFormData] = useState<Cotisation>(
    initialData || {
      id: Date.now().toString(),
      adherentId: "",
      montant: 0,
      datePaiement: new Date().toISOString().split("T")[0],
      statut: "en attente",
    },
  )

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        id: Date.now().toString(),
        adherentId: "",
        montant: 0,
        datePaiement: new Date().toISOString().split("T")[0],
        statut: "en attente",
      })
    }
  }, [isOpen, initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.adherentId || formData.montant <= 0) {
      alert("Veuillez remplir tous les champs correctement")
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
          <h2 className="text-xl font-bold">{initialData ? "Modifier Cotisation" : "Ajouter Cotisation"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Adhérent *</label>
            <select
              value={formData.adherentId}
              onChange={(e) => setFormData({ ...formData, adherentId: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Sélectionner un adhérent</option>
              {adherents.map((adherent) => (
                <option key={adherent.id} value={adherent.id}>
                  {adherent.prenom} {adherent.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Montant (DH) *</label>
            <input
              type="number"
              value={formData.montant}
              onChange={(e) => setFormData({ ...formData, montant: Number.parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date Paiement</label>
            <input
              type="date"
              value={formData.datePaiement}
              onChange={(e) => setFormData({ ...formData, datePaiement: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Statut</label>
            <select
              value={formData.statut}
              onChange={(e) => setFormData({ ...formData, statut: e.target.value as any })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="payée">Payée</option>
              <option value="en attente">En attente</option>
              <option value="en retard">En retard</option>
            </select>
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
