"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate login - in production, this would call an API
    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Veuillez entrer une adresse email valide")
      setIsLoading(false)
      return
    }

    // Store login state in localStorage (for demo purposes)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", email)

    // Redirect to dashboard
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-12">
          <div className="relative w-32 h-32">
            <Image src="/logo-raja-tech.png" alt="Raja Club Athletic" fill className="object-contain" priority />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Raja Club Athletic</h1>
          <p className="text-base text-slate-600">Système de Gestion des Adhérents</p>
        </div>

        <div className="w-full bg-white rounded-xl shadow-lg p-8">
          {/* Card header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-1">Connexion</h2>
            <p className="text-sm text-slate-600">Connectez-vous à votre compte pour accéder au système de gestion</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="rounded-lg border-0 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-900">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full border-slate-200 rounded-lg h-10 text-sm placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-900">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full border-slate-200 rounded-lg h-10 text-sm placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-medium h-10 rounded-lg mt-6 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
