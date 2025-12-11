"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit2, Trash2, BarChart3, Users, Activity, DollarSign, Trophy, Filter, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdherentForm } from "@/components/adherent-form"
import { ActiviteForm } from "@/components/activite-form"
import { EntraineurForm } from "@/components/entraineur-form"
import { CotisationForm } from "@/components/cotisation-form"

interface Adherent {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  dateInscription: string
  statut: "actif" | "inactif"
  supporterRAC: boolean // Added supporter flag
}

interface Activite {
  id: string
  nom: string
  description: string
  entraineurId: string
  dateDebut: string
  niveauDifficulte: string
  maxAdherents: number
}

interface Entraineur {
  id: string
  nom: string
  prenom: string
  specialite: string
  email: string
  telephone: string
}

interface Cotisation {
  id: string
  adherentId: string
  montant: number
  datePaiement: string
  statut: "payée" | "en attente" | "en retard"
}

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-12 py-8 border-t border-primary-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Raja Club Athletic</h3>
            <p className="text-sm opacity-90">Système de Gestion Professionnel</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">À Propos</h3>
            <p className="text-sm opacity-90">
              Plateforme dédiée à la gestion des adhérents, activités et cotisations du Raja Club Athletic
            </p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-primary-dark pt-4 md:pt-0 md:pl-4">
            <h3 className="font-bold text-lg mb-2">Créateurs du Projet</h3>
            <p className="text-sm opacity-90">
              Créé avec passion par :<br />
              <span className="font-semibold">Ayoub Achmaoui</span>
              <br />
              <span className="font-semibold">Ahmed Rayyan Beniffou</span>
              <br />
              <span className="font-semibold">Youssra Kahar</span>
            </p>
          </div>
        </div>
        <div className="border-t border-primary-dark mt-6 pt-6 text-center text-xs opacity-75">
          <p>&copy; {new Date().getFullYear()} Raja Club Athletic. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [adherents, setAdherents] = useState<Adherent[]>([])
  const [activites, setActivites] = useState<Activite[]>([])
  const [entraineurs, setEntraineurs] = useState<Entraineur[]>([])
  const [cotisations, setCotisations] = useState<Cotisation[]>([])
  const [loading, setLoading] = useState(true)
  const [filterRACOnly, setFilterRACOnly] = useState(false) // Added RAC filter state

  const [showAdherentForm, setShowAdherentForm] = useState(false)
  const [showActiviteForm, setShowActiviteForm] = useState(false)
  const [showEntraineurForm, setShowEntraineurForm] = useState(false)
  const [showCotisationForm, setShowCotisationForm] = useState(false)

  const [selectedAdherent, setSelectedAdherent] = useState<Adherent | null>(null)
  const [selectedActivite, setSelectedActivite] = useState<Activite | null>(null)
  const [selectedEntraineur, setSelectedEntraineur] = useState<Entraineur | null>(null)
  const [selectedCotisation, setSelectedCotisation] = useState<Cotisation | null>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }

    const savedAdherents = localStorage.getItem("adherents")
    const savedActivites = localStorage.getItem("activites")
    const savedEntraineurs = localStorage.getItem("entraineurs")
    const savedCotisations = localStorage.getItem("cotisations")

    if (savedAdherents) setAdherents(JSON.parse(savedAdherents))
    if (savedActivites) setActivites(JSON.parse(savedActivites))
    if (savedEntraineurs) setEntraineurs(JSON.parse(savedEntraineurs))
    if (savedCotisations) setCotisations(JSON.parse(savedCotisations))
    else {
      initializeSampleData()
    }
    setLoading(false)
  }, [router])

  const initializeSampleData = () => {
    const sampleEntraineurs: Entraineur[] = [
      {
        id: "1",
        nom: "El Idrissi",
        prenom: "Rachid",
        specialite: "Entraîneur Seniors",
        email: "rachid.elidrissi@raja.com",
        telephone: "0670551903",
      },
      {
        id: "2",
        nom: "El Hanafi",
        prenom: "Yassine",
        specialite: "Formation Jeunes",
        email: "yassine.elhanafi@raja.com",
        telephone: "0654770882",
      },
      {
        id: "3",
        nom: "Boutaina",
        prenom: "Hajar",
        specialite: "Préparation Physique",
        email: "hajar.boutaina@raja.com",
        telephone: "0668921440",
      },
    ]

    const sampleAdherents: Adherent[] = [
      {
        id: "1",
        nom: "El Mansouri",
        prenom: "Zakaria",
        email: "zak.mansouri@rca.ma",
        telephone: "0662450781",
        dateInscription: "2025-01-05",
        statut: "actif",
        supporterRAC: true,
      },
      {
        id: "2",
        nom: "Chami",
        prenom: "Imane",
        email: "imane.chami@rca.ma",
        telephone: "0678901334",
        dateInscription: "2025-01-07",
        statut: "actif",
        supporterRAC: false,
      },
      {
        id: "3",
        nom: "Berrada",
        prenom: "Hamza",
        email: "hamza.berrada@rca.ma",
        telephone: "0650889102",
        dateInscription: "2024-12-20",
        statut: "inactif",
        supporterRAC: true,
      },
    ]

    const sampleActivites: Activite[] = [
      {
        id: "1",
        nom: "Séance d'entraînement – Seniors",
        description: "Entraînement des seniors à Complexe l'Oasis",
        entraineurId: "1",
        dateDebut: "2025-01-12",
        niveauDifficulte: "Avancé",
        maxAdherents: 30,
      },
      {
        id: "2",
        nom: "Atelier Technique – Passe & Dribble",
        description: "Atelier technique au Centre de Formation Raja",
        entraineurId: "2",
        dateDebut: "2025-01-15",
        niveauDifficulte: "Moyen",
        maxAdherents: 25,
      },
      {
        id: "3",
        nom: "Match Amical – Équipe Réserve",
        description: "Match amical au Terrain Annexe du Stade Mohamed V",
        entraineurId: "3",
        dateDebut: "2025-01-20",
        niveauDifficulte: "Avancé",
        maxAdherents: 22,
      },
    ]

    const sampleCotisations: Cotisation[] = [
      { id: "1", adherentId: "1", montant: 300, datePaiement: "2025-01-05", statut: "payée" },
      { id: "2", adherentId: "2", montant: 300, datePaiement: "2025-01-07", statut: "payée" },
      { id: "3", adherentId: "3", montant: 300, datePaiement: "2024-12-20", statut: "en retard" },
    ]

    setEntraineurs(sampleEntraineurs)
    setAdherents(sampleAdherents)
    setActivites(sampleActivites)
    setCotisations(sampleCotisations)

    localStorage.setItem("entraineurs", JSON.stringify(sampleEntraineurs))
    localStorage.setItem("adherents", JSON.stringify(sampleAdherents))
    localStorage.setItem("activites", JSON.stringify(sampleActivites))
    localStorage.setItem("cotisations", JSON.stringify(sampleCotisations))
  }

  const deleteAdherent = (id: string) => {
    const updated = adherents.filter((a) => a.id !== id)
    setAdherents(updated)
    localStorage.setItem("adherents", JSON.stringify(updated))
  }

  const deleteActivite = (id: string) => {
    const updated = activites.filter((a) => a.id !== id)
    setActivites(updated)
    localStorage.setItem("activites", JSON.stringify(updated))
  }

  const deleteEntraineur = (id: string) => {
    const updated = entraineurs.filter((e) => e.id !== id)
    setEntraineurs(updated)
    localStorage.setItem("entraineurs", JSON.stringify(updated))
  }

  const deleteCotisation = (id: string) => {
    const updated = cotisations.filter((c) => c.id !== id)
    setCotisations(updated)
    localStorage.setItem("cotisations", JSON.stringify(updated))
  }

  const updateAdherent = (updatedAdherent: Adherent) => {
    const updated = adherents.map((a) => (a.id === updatedAdherent.id ? updatedAdherent : a))
    setAdherents(updated)
    localStorage.setItem("adherents", JSON.stringify(updated))
  }

  const getEntraineurName = (id: string) => {
    const entraineur = entraineurs.find((e) => e.id === id)
    return entraineur ? `${entraineur.prenom} ${entraineur.nom}` : "Non assigné"
  }

  const getAdherentName = (id: string) => {
    const adherent = adherents.find((a) => a.id === id)
    return adherent ? `${adherent.prenom} ${adherent.nom}` : "Inconnu"
  }

  const filteredAdherents = filterRACOnly ? adherents.filter((a) => a.supporterRAC) : adherents

  const handleAddAdherent = () => {
    setSelectedAdherent(null)
    setShowAdherentForm(true)
  }

  const handleEditAdherent = (adherent: Adherent) => {
    setSelectedAdherent(adherent)
    setShowAdherentForm(true)
  }

  const handleSubmitAdherent = (adherent: Adherent) => {
    if (selectedAdherent) {
      // Update existing
      updateAdherent(adherent)
    } else {
      // Add new
      const updated = [...adherents, adherent]
      setAdherents(updated)
      localStorage.setItem("adherents", JSON.stringify(updated))
    }
  }

  const handleAddActivite = () => {
    setSelectedActivite(null)
    setShowActiviteForm(true)
  }

  const handleEditActivite = (activite: Activite) => {
    setSelectedActivite(activite)
    setShowActiviteForm(true)
  }

  const handleSubmitActivite = (activite: Activite) => {
    if (selectedActivite) {
      // Update existing
      const updated = activites.map((a) => (a.id === activite.id ? activite : a))
      setActivites(updated)
      localStorage.setItem("activites", JSON.stringify(updated))
    } else {
      // Add new
      const updated = [...activites, activite]
      setActivites(updated)
      localStorage.setItem("activites", JSON.stringify(updated))
    }
  }

  const handleAddEntraineur = () => {
    setSelectedEntraineur(null)
    setShowEntraineurForm(true)
  }

  const handleEditEntraineur = (entraineur: Entraineur) => {
    setSelectedEntraineur(entraineur)
    setShowEntraineurForm(true)
  }

  const handleSubmitEntraineur = (entraineur: Entraineur) => {
    if (selectedEntraineur) {
      // Update existing
      const updated = entraineurs.map((e) => (e.id === entraineur.id ? entraineur : e))
      setEntraineurs(updated)
      localStorage.setItem("entraineurs", JSON.stringify(updated))
    } else {
      // Add new
      const updated = [...entraineurs, entraineur]
      setEntraineurs(updated)
      localStorage.setItem("entraineurs", JSON.stringify(updated))
    }
  }

  const handleAddCotisation = () => {
    setSelectedCotisation(null)
    setShowCotisationForm(true)
  }

  const handleEditCotisation = (cotisation: Cotisation) => {
    setSelectedCotisation(cotisation)
    setShowCotisationForm(true)
  }

  const handleSubmitCotisation = (cotisation: Cotisation) => {
    if (selectedCotisation) {
      // Update existing
      const updated = cotisations.map((c) => (c.id === cotisation.id ? cotisation : c))
      setCotisations(updated)
      localStorage.setItem("cotisations", JSON.stringify(updated))
    } else {
      // Add new
      const updated = [...cotisations, cotisation]
      setCotisations(updated)
      localStorage.setItem("cotisations", JSON.stringify(updated))
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-foreground">Chargement...</div>
  }

  const racSupporters = adherents.filter((a) => a.supporterRAC).length
  const totalAdherents = adherents.length
  const paidCotisations = cotisations.filter((c) => c.statut === "payée").length

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header with Raja Branding */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo Area */}
              <div className="w-20 h-20 flex items-center justify-center">
                <img src="/raja-logo.png" alt="Raja Club Athletic Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Raja Club Athletic</h1>
                <p className="text-sm mt-1 opacity-90">Système de Gestion - Adhérents & Activités</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 flex items-center gap-2"
            >
              <LogOut size={20} />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 flex gap-4">
          {[
            { id: "dashboard", label: "Tableau de Bord", icon: BarChart3 },
            { id: "adherents", label: "Adhérents", icon: Users },
            { id: "activites", label: "Activités", icon: Activity },
            { id: "entraineurs", label: "Entraînneurs", icon: Users },
            { id: "cotisations", label: "Cotisations", icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 font-medium flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Adhérents",
                  value: totalAdherents,
                  icon: Users,
                  color: "bg-primary text-primary-foreground",
                },
                {
                  label: "Supporters RAC",
                  value: racSupporters,
                  icon: Trophy,
                  color: "bg-accent text-accent-foreground",
                },
                {
                  label: "Activités",
                  value: activites.length,
                  icon: Activity,
                  color: "bg-primary text-primary-foreground",
                },
                {
                  label: "Cotisations Payées",
                  value: paidCotisations,
                  icon: DollarSign,
                  color: "bg-accent text-accent-foreground",
                },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className={`p-6 rounded-lg ${stat.color} shadow-md`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium opacity-90">{stat.label}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      </div>
                      <Icon size={40} className="opacity-20" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg shadow-md p-6 border border-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy className="text-primary" />
                  Statistiques Supporters RAC
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Pourcentage de supporters</p>
                    <p className="text-2xl font-bold text-primary">
                      {totalAdherents > 0 ? Math.round((racSupporters / totalAdherents) * 100) : 0}%
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary rounded-full h-3 transition-all"
                      style={{
                        width: totalAdherents > 0 ? `${(racSupporters / totalAdherents) * 100}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg shadow-md p-6 border border-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="text-accent" />
                  Status des Cotisations
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Payées</span>
                    <span className="font-bold text-primary">{paidCotisations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>En attente</span>
                    <span className="font-bold">{cotisations.filter((c) => c.statut === "en attente").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>En retard</span>
                    <span className="font-bold text-destructive">
                      {cotisations.filter((c) => c.statut === "en retard").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Adherents Tab */}
        {activeTab === "adherents" && (
          <div className="bg-card rounded-lg shadow">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-2xl font-bold">Adhérents</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setFilterRACOnly(!filterRACOnly)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    filterRACOnly ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  <Filter size={20} />
                  {filterRACOnly ? "Supporters RAC" : "Tous"}
                </button>
                <button
                  onClick={handleAddAdherent}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Plus size={20} />
                  Ajouter Adhérent
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Téléphone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Supporter RAC</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Statut</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdherents.map((adherent) => (
                    <tr
                      key={adherent.id}
                      className={`border-b border-border hover:bg-muted/50 ${
                        adherent.supporterRAC ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className={`px-6 py-4 font-medium ${adherent.supporterRAC ? "text-primary font-bold" : ""}`}>
                        {adherent.prenom} {adherent.nom}
                      </td>
                      <td className="px-6 py-4 text-sm">{adherent.email}</td>
                      <td className="px-6 py-4 text-sm">{adherent.telephone}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold flex w-fit ${
                            adherent.supporterRAC
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {adherent.supporterRAC ? "✓ Oui" : "Non"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            adherent.statut === "actif"
                              ? "bg-primary/20 text-primary"
                              : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {adherent.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditAdherent(adherent)}
                            className="text-primary hover:text-accent p-1 transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteAdherent(adherent.id)}
                            className="text-destructive hover:text-destructive/80 p-1 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Activites Tab */}
        {activeTab === "activites" && (
          <div className="bg-card rounded-lg shadow">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-2xl font-bold">Activités Raja</h2>
              <button
                onClick={handleAddActivite}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus size={20} />
                Ajouter Activité
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {activites.map((activite) => (
                <div
                  key={activite.id}
                  className="border-2 border-primary rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-accent/5"
                >
                  <h3 className="text-lg font-bold text-primary mb-2">{activite.nom}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{activite.description}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <p>
                      <span className="font-semibold">Entraîneur:</span> {getEntraineurName(activite.entraineurId)}
                    </p>
                    <p>
                      <span className="font-semibold">Niveau:</span>{" "}
                      <span className="text-primary font-bold">{activite.niveauDifficulte}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Participants:</span> {activite.maxAdherents}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <button
                      onClick={() => handleEditActivite(activite)}
                      className="text-primary hover:text-accent p-1 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteActivite(activite.id)}
                      className="text-destructive hover:text-destructive/80 p-1 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Entraineurs Tab */}
        {activeTab === "entraineurs" && (
          <div className="bg-card rounded-lg shadow">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-2xl font-bold">Entraînneurs Raja</h2>
              <button
                onClick={handleAddEntraineur}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus size={20} />
                Ajouter Entraîneur
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Spécialité</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Téléphone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entraineurs.map((entraineur) => (
                    <tr key={entraineur.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">
                        {entraineur.prenom} {entraineur.nom}
                      </td>
                      <td className="px-6 py-4 text-sm text-primary font-semibold">{entraineur.specialite}</td>
                      <td className="px-6 py-4 text-sm">{entraineur.email}</td>
                      <td className="px-6 py-4 text-sm">{entraineur.telephone}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEntraineur(entraineur)}
                            className="text-primary hover:text-accent p-1 transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteEntraineur(entraineur.id)}
                            className="text-destructive hover:text-destructive/80 p-1 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cotisations Tab */}
        {activeTab === "cotisations" && (
          <div className="bg-card rounded-lg shadow">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-2xl font-bold">Cotisations</h2>
              <button
                onClick={handleAddCotisation}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus size={20} />
                Ajouter Cotisation
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Adhérent</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Montant</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date Paiement</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Statut</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cotisations.map((cotisation) => (
                    <tr key={cotisation.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">{getAdherentName(cotisation.adherentId)}</td>
                      <td className="px-6 py-4 font-bold text-primary">{cotisation.montant}€</td>
                      <td className="px-6 py-4 text-sm">{cotisation.datePaiement}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            cotisation.statut === "payée"
                              ? "bg-primary/20 text-primary"
                              : cotisation.statut === "en attente"
                                ? "bg-accent/20 text-accent"
                                : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {cotisation.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCotisation(cotisation)}
                            className="text-primary hover:text-accent p-1 transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteCotisation(cotisation.id)}
                            className="text-destructive hover:text-destructive/80 p-1 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Form Components with Modal State */}
      <AdherentForm
        isOpen={showAdherentForm}
        onClose={() => setShowAdherentForm(false)}
        onSubmit={handleSubmitAdherent}
        initialData={selectedAdherent}
      />

      <ActiviteForm
        isOpen={showActiviteForm}
        onClose={() => setShowActiviteForm(false)}
        onSubmit={handleSubmitActivite}
        entraineurs={entraineurs}
        initialData={selectedActivite}
      />

      <EntraineurForm
        isOpen={showEntraineurForm}
        onClose={() => setShowEntraineurForm(false)}
        onSubmit={handleSubmitEntraineur}
        initialData={selectedEntraineur}
      />

      <CotisationForm
        isOpen={showCotisationForm}
        onClose={() => setShowCotisationForm(false)}
        onSubmit={handleSubmitCotisation}
        adherents={adherents}
        initialData={selectedCotisation}
      />
      <Footer />
    </div>
  )
}
